import DOMPurify from 'dompurify'
import { DifficultyLevel, RightAnswerTask, RightAnswerTaskText } from 'types'
import * as Yup from 'yup'

export const initialValuesRightAnswerPut: RightAnswerTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      taskQuestion: '&nbsp;',
      taskAnswers: [],
    },
  ],
  parameters: ['oneDifficultyLevel'],
}
// taskQuestion: '&nbsp;', - fix чтобы можно было принудительно поставить прочерк в начале строки
// потому что при 0 положении курсора, если ставить прочерк, то он поставится в конце строка (для несфокусированого инпута)

export const validationSchemaRightAnswerPut = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  taskText: Yup.array().of(
    Yup.object({
      taskQuestion: Yup.string(),
      // .test({
      //   name: 'taskQuestion',
      //   skipAbsent: true,
      //   test: (value, ctx) => {
      //     if (!value) {
      //       return ctx.createError({ message: 'Не всі рівні складності заповнені' })
      //     }
      //     if (!!value && value?.length < 10) {
      //       return ctx.createError({ message: 'Недостатньо символів' })
      //     }
      //     return true
      //   },
      // }),
      taskAnswers: Yup.array(),
    }),
  ),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})

export const preparedAndSanitizeTaskText = (
  taskTextInit: RightAnswerTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { taskQuestion, taskAnswers } = taskTextInit.find(
      (item: RightAnswerTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { taskQuestion: '', taskAnswers: [] }

    taskText = [
      {
        taskQuestion,
        taskAnswers,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  // XSS sanitizer for HTML,
  const sanitizeTaskText = taskText.map((item) => ({
    ...item,
    taskQuestion: DOMPurify.sanitize(item?.taskQuestion || '', {
      ALLOWED_ATTR: ['style', 'class', 'contentEditable', 'data-skip'],
    }),
  }))

  return sanitizeTaskText
}

export const validateFillTabs = (taskText: RightAnswerTaskText[]) => {
  const tabNotFilled: string[] = []
  taskText.forEach((item) => {
    if (!item.taskQuestion || item.taskQuestion.length < 10) {
      switch (item.difficultyLevel) {
        case 'easy':
          tabNotFilled.push('Легкий')
          break
        case 'middle':
          tabNotFilled.push('Середній')
          break
        case 'hard':
          tabNotFilled.push('Складний')
          break
        default:
          tabNotFilled.push(item.difficultyLevel)
          break
      }
    }
  })

  return tabNotFilled
}
