import { TrueOrFalseTask } from 'types'
import { generateId } from 'utils'
import * as Yup from 'yup'

export const initialValuesTrueOrFalse: TrueOrFalseTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      taskItemData: { id: generateId(), format: 'trueOrFalse', question: '', answer: true },
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaTrueOrFalse = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
