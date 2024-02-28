import { CategorizeTaskText } from 'types'
import { generateId } from 'utils'

export const emptyMidAndHardTab: CategorizeTaskText[] = [
  {
    difficultyLevel: 'middle',
    groups: [
      { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
      { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
    ],
  },
  {
    difficultyLevel: 'hard',
    groups: [
      { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
      { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
    ],
  },
]
