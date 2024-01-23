export const getTitle = (taskType?: string) => {
  switch (taskType) {
    case 'rightAnswerTask':
      return 'Правильна відповідь'

    default:
      return ''
  }
}
