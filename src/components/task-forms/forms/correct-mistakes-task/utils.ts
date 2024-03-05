import { CorrectMistakesTask } from 'types'
import * as Yup from 'yup'

export const initialValuesCorrectMistakes: CorrectMistakesTask = {
  title: '',
  description: '',
  taskText: [
    {
      difficultyLevel: 'easy',
      wrongSentence: '',
      correctSentence: '',
    },
  ],
  parameters: ['oneDifficultyLevel'],
}

export const validationSchemaCorrectMistakes = Yup.object({
  title: Yup.string().min(3, 'Мінімум 3 символи').required('Назва - обов`язкове поле!'),
  description: Yup.string(),
  taskText: Yup.array().of(
    Yup.object({
      wrongSentence: Yup.string(),
      correctSentence: Yup.string(),
    }),
  ),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
