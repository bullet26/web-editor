import { TaskWithoutAnswer } from 'types'
import * as Yup from 'yup'

export const initialValuesSplitSentenceOrder: TaskWithoutAnswer = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      taskQuestion: '',
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaSplitSentenceOrder = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  taskText: Yup.array().of(
    Yup.object({
      taskQuestion: Yup.string(),
    }),
  ),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
