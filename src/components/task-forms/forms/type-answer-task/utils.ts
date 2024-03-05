import { RightAnswerTask } from 'types'
import * as Yup from 'yup'

export const initialValuesAnswerFromSelect: RightAnswerTask = {
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

export const validationSchemaAnswerFromSelect = Yup.object({
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
