import { generateId } from 'utils'

export const emptyMidAndHardTab = [
  {
    difficultyLevel: 'middle',
    sentences: [{ id: generateId(), sentence: '' }],
  },
  {
    difficultyLevel: 'hard',
    sentences: [{ id: generateId(), sentence: '' }],
  },
]
