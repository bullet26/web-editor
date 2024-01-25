import { RightAnswerTask } from 'types'
import * as Yup from 'yup'

export const initialValuesRightAnswerPut: RightAnswerTask = {
  code: '',
  title: '',
  difficultyLevel: 'easy',
  subtitle: '',
  taskText: '',
  parameters: [],
}

export const validationSchemaRightAnswerPut = Yup.object({
  code: Yup.string(),
  title: Yup.string().min(3, 'Мінімум 3 літери').required('Обов`язкове поле!'),
  difficultyLevel: Yup.string().matches(/(easy|middle|hard)/),
  subtitle: Yup.string(),
  taskText: Yup.string().required('Обов`язкове поле!'),
  parameters: Yup.array()
    .min(0)
    .max(4)
    .of(Yup.string().matches(/(withCheck|passAgain|randomPlacement|oneDifficultyLevel)/)),
})
