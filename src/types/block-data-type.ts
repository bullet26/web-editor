import {
  CategorizeTask,
  CompareTask,
  RightAnswerTask,
  TaskWithoutAnswer,
  SortDialogueTask,
  TrueOrFalseTask,
  CorrectMistakesTask,
} from 'types'

export const types = [
  'title',
  'custom',
  'note',
  'image',
  'table',
  'rightAnswerTask',
  'answerFromSelect',
  'orderSplitSentence',
  'compareTask',
  'categorizeTask',
  'sortDialogue',
  'trueOrFalseTask',
  'typeAnswerTask',
  'correctMistakesTask',
]

export type Type = (typeof types)[number]

export type DifficultyLevel = 'easy' | 'middle' | 'hard'

export type TaskType =
  | RightAnswerTask
  | TaskWithoutAnswer
  | CompareTask
  | CategorizeTask
  | SortDialogueTask
  | TrueOrFalseTask
  | CorrectMistakesTask

export type DataTypeItem = {
  text?: string
  type: Type
  savedInLibrary: boolean
  id: string
  url?: string
  taskData?: TaskType
  tableColumns?: Omit<DataTypeItem, 'savedInLibrary'>[]
  imageCaption?: string
}

export type DataType = DataTypeItem[]

export type DataTypeItemTask = Pick<DataTypeItem, 'type' | 'id'> & {
  taskData: TaskType
}
