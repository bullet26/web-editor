import { SortDialogueTask } from 'types'
import { generateId } from 'utils'
import * as Yup from 'yup'

export const initialValuesSortDialogue: SortDialogueTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      sentences: [{ id: generateId(), sentence: '' }],
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaSortDialogue = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
