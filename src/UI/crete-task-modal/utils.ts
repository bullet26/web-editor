export const getTitle = (taskType: string | null) => {
  switch (taskType) {
    case 'g1':
      return 'Правильна відповідь'

    default:
      return ''
  }
}
