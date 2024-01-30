export const getTitle = (taskType: string | null) => {
  switch (taskType) {
    case 'rightAnswerTask':
      return 'Правильна відповідь'

    default:
      return ''
  }
}
