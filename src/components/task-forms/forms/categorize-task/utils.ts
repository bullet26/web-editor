import { CategorizeTask } from 'types'
import { generateId } from 'utils'
import * as Yup from 'yup'

export const initialValuesCategorize: CategorizeTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      groups: [
        { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
        { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
      ],
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaCategorize = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
