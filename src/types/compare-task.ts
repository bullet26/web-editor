import { DifficultyLevel, RightAnswerTask } from 'types'

export interface CompareTaskWordPair {
  id: string
  left: string
  right: string
}

export interface CompareTaskText {
  difficultyLevel: DifficultyLevel
  wordPairs: CompareTaskWordPair[]
}

export interface CompareTask extends Omit<RightAnswerTask, 'taskText'> {
  taskText: CompareTaskText[]
}
