import { TrueOrFalseTaskText } from 'types'
import { generateId } from 'utils'

export const emptyMidAndHardTab: TrueOrFalseTaskText[] = [
  {
    difficultyLevel: 'middle',
    taskItemData: { id: generateId(), format: 'trueOrFalse', question: '', answer: true },
  },
  {
    difficultyLevel: 'hard',
    taskItemData: { id: generateId(), format: 'trueOrFalse', question: '', answer: true },
  },
]
