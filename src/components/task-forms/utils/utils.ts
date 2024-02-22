import { RightAnswerTaskText } from 'types'
import DOMPurify from 'dompurify'

export const convertDifficultyLevel = (difficultyLevel: string) => {
  switch (difficultyLevel) {
    case 'easy':
      return 'Легкий'
    case 'middle':
      return 'Середній'
    case 'hard':
      return 'Складний'
    default:
      return difficultyLevel
  }
}

// XSS sanitizer for HTML,
export const sanitizeTaskText = (taskText: RightAnswerTaskText[]) => {
  return taskText.map((item) => ({
    ...item,
    taskQuestion: DOMPurify.sanitize(item?.taskQuestion || '', {
      ALLOWED_ATTR: ['style', 'class', 'contentEditable', 'data-skip'],
    }),
  }))
}
