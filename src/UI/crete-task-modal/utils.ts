export const getTitle = (taskType: string | null) => {
  switch (taskType) {
    case 'rightAnswerTask':
      return 'Правильна відповідь'
    case 'answerFromSelect':
      return 'Варіант зі списку в тексті'
    case 'orderSplitSentence':
      return 'Розставити слова у правильному порядку'
    case 'compareTask':
      return 'Співвідносити'
    case 'categorizeTask':
      return 'Категорувати'
    case 'sortDialogue':
      return 'Розставити фрази у діалозi'
    case 'trueOrFalseTask':
      return 'Правда / Неправда'
    default:
      return ''
  }
}
