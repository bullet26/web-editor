export const getTitle = (taskType?: string) => {
  switch (taskType) {
    case 'g1':
      return 'Правильна відповідь'

    default:
      return ''
  }
}
