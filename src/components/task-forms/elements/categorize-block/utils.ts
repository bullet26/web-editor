import { CategorizeTaskText } from 'types'
import { generateId } from 'utils'

export const emptyMidAndHardTab: CategorizeTaskText[] = [
  {
    difficultyLevel: 'middle',
    groups: [{ id: generateId(), mainWord: '', otherWords: [] }],
  },
  {
    difficultyLevel: 'hard',
    groups: [{ id: generateId(), mainWord: '', otherWords: [] }],
  },
]
