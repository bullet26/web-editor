import { CompareTask } from 'types'
import { generateId } from 'utils'
import * as Yup from 'yup'

export const initialValuesCompare: CompareTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      wordPairs: [{ id: generateId(), left: '', right: '' }],
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaCompare = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
