import { DifficultyLevel, RightAnswerTask } from 'types'

export interface SortDialogueSentence {
  id: string
  sentence: string
}

export interface SortDialogueTaskText {
  difficultyLevel: DifficultyLevel
  sentences: SortDialogueSentence[]
}

export interface SortDialogueTask extends Omit<RightAnswerTask, 'taskText'> {
  taskText: SortDialogueTaskText[]
}
