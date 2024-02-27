import { CompareTaskText } from 'types'
import { generateId } from 'utils'

export const emptyMidAndHardTab: CompareTaskText[] = [
  {
    difficultyLevel: 'middle',
    wordPairs: [{ id: generateId(), left: '', right: '' }],
  },
  {
    difficultyLevel: 'hard',
    wordPairs: [{ id: generateId(), left: '', right: '' }],
  },
]
