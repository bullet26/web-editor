export const getTitle = (taskType: string | null) => {
  switch (taskType) {
    case 'rightAnswerTask':
      return 'Правильна відповідь'
    case 'answerFromSelect':
      return 'Варіант зі списку в тексті'
    default:
      return ''
  }
}
