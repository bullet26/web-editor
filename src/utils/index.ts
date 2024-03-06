import { nanoid } from 'nanoid'

export const generateId = () => nanoid()

export const getLabel = (type: string): { label: string; placeholder: string } => {
  switch (type) {
    case 'title':
      return { label: 'Заголовок', placeholder: 'Введіть назву розділу' }
    case 'note':
      return { label: 'Примітки для викладача', placeholder: 'Введіть примітки для викладача' }
    case 'image':
      return {
        label: 'Зображення',
        placeholder: 'Клікніть або перетягніть картинку у цю область, щоб завантажити її',
      }
    case 'custom':
      return { label: 'Загальний блок', placeholder: 'Введіть текст та додайте елементи' }
    case 'table':
      return { label: 'Два блоки', placeholder: 'Введіть текст та додайте елементи' }
    case 'rightAnswerTask':
      return {
        label: 'Завдання: Правильна відповідь',
        placeholder: '',
      }
    case 'onlyOneOrTwoRightAnswerTask':
      return {
        label: 'Завдання: Одна правильна відповідь',
        placeholder: '',
      }
    case 'answerFromSelect':
      return {
        label: 'Завдання: Варіант зі списку в тексті',
        placeholder: '',
      }
    case 'orderSplitSentence':
      return {
        label: 'Завдання: Розставити слова у правильному порядку',
        placeholder: '',
      }
    case 'compareTask':
      return {
        label: 'Завдання: Співвідносити',
        placeholder: '',
      }
    case 'categorizeTask':
      return {
        label: 'Завдання: Категорувати',
        placeholder: '',
      }
    case 'sortDialogue':
      return {
        label: 'Завдання: Розставити фрази у діалозі',
        placeholder: '',
      }
    case 'trueOrFalseTask':
      return {
        label: 'Завдання: Правда / Неправда',
        placeholder: '',
      }
    case 'typeAnswerTask':
      return {
        label: 'Завдання: Ввести текст у пропуск',
        placeholder: '',
      }
    case 'correctMistakesTask':
      return {
        label: 'Завдання: Змінити  слова у реченні',
        placeholder: '',
      }
    default:
      return { label: type, placeholder: 'Введіть текст' }
  }
}
