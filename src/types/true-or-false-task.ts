import { DifficultyLevel, RightAnswerTask } from 'types'

export interface TrueOrFalseItem {
  id: string
  format: 'yesOrNo' | 'trueOrFalse'
  question: string
  answer: boolean
}

export interface TrueOrFalseTaskText {
  difficultyLevel: DifficultyLevel
  taskItemData: TrueOrFalseItem
}

export interface TrueOrFalseTask extends Omit<RightAnswerTask, 'taskText'> {
  taskText: TrueOrFalseTaskText[]
}
