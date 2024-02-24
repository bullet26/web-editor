import { DifficultyLevel, RightAnswerTask, RightAnswerTaskText } from 'types'
import { message } from 'antd'
import * as Yup from 'yup'
import { convertDifficultyLevel, sanitizeTaskText } from './utils'

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

  return sanitizeTaskText(taskText)
}

const validateFillTabs = (taskText: RightAnswerTaskText[]) => {
  const tabNotFilled: string[] = []
  taskText.forEach((item) => {
    if (!item.taskQuestion || item.taskQuestion.length < 10) {
      tabNotFilled.push(convertDifficultyLevel(item.difficultyLevel))
    }
  })

  return tabNotFilled
}

const validateCorrectAnswer = (taskText: RightAnswerTaskText[]) => {
  const res: string[] = []
  taskText.forEach(({ taskAnswers, difficultyLevel }) =>
    taskAnswers.forEach(({ answers }) =>
      answers.forEach(({ type, value }) => {
        if (type === 'correct' && !value) {
          res.push(convertDifficultyLevel(difficultyLevel))
        }
      }),
    ),
  )
  return Array.from(new Set(res))
}

export const validateTabAndCorrectAnswer = (
  taskText: RightAnswerTaskText[],
  isOneDifficultyLevel: boolean,
) => {
  const tabNotFilled = validateFillTabs(taskText)
  if (tabNotFilled.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнений текст задання'
        : `Не заповнений текст задання на: ${tabNotFilled.join(', ')} рівень`,
    )
    return false
  }

  const tabNotFilledCorrectAnswer = validateCorrectAnswer(taskText)
  if (tabNotFilledCorrectAnswer.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнена правильна відповідь'
        : `Не заповнена правильна відповідь на: ${tabNotFilledCorrectAnswer.join(', ')} рівень`,
    )
    return false
  }

  return true
}
