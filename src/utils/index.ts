export const generateId = () => Math.random().toString(36).slice(2, 9)

export const getLabel = (type: string) => {
  switch (type) {
    case 'title':
      return 'Заголовок'
    case 'subtitle':
      return 'Підзаголовок'
    case 'theme':
      return 'Тема'
    case 'text':
      return 'Текстове поле'
    case 'image':
      return 'image'
    default:
      return type
  }
}
