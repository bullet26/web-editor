export const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

export const generateId = () => Math.random().toString(36).slice(2, 9)

export const getLabel = (type: string): { label: string; placeholder: string } => {
  switch (type) {
    case 'title':
      return { label: 'Заголовок розділу', placeholder: 'Введіть назву розділу' }
    case 'subtitle':
      return { label: 'Підзаголовок', placeholder: 'Введіть підзаголовок' }
    case 'note':
      return { label: 'Примітки для викладача', placeholder: 'Введіть примітки для викладача' }
    case 'image':
      return {
        label: 'Картинка',
        placeholder: 'Клікніть або перетягніть картинку у цю область, щоб завантажити її',
      }
    case 'custom':
      return { label: 'Власний блок', placeholder: 'Введіть текст та додайте елементи' }
    case 'table':
      return { label: 'Два блоки', placeholder: 'Введіть текст та додайте елементи' }
    case 'rightAnswerTask':
      return {
        label: 'Завдання: Правильна відповідь',
        placeholder: '',
      }

    default:
      return { label: type, placeholder: 'Введіть текст' }
  }
}
