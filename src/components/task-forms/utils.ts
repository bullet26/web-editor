import { RightAnswerTask } from 'types'
import * as Yup from 'yup'

export const initialValuesRightAnswerPut: RightAnswerTask = {
  code: '',
  title: '',
  difficultyLevel: 'easy',
  subtitle: '',
  taskText: '&nbsp;&nbsp;',
  taskAnswers: [],
  parameters: [],
}
// taskText: '&nbsp;', - fix чтобы можно было принудительно поставить прочерк в начале строки
// потому что при 0 положении курсора, если ставить прочерк, то он поставится в конце строка (для несфокусированого инпута)

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
