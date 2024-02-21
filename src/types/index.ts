export const types = [
  'title',
  'custom',
  'note',
  'image',
  'table',
  'rightAnswerTask',
  'answerFromSelect',
]

export type Type = (typeof types)[number]

export interface RightAnswerTaskItem {
  id: string
  type: 'correct' | 'incorrect'
  value: string
}

export interface RightAnswerTaskAnswer {
  id: string
  answers: RightAnswerTaskItem[]
}

export type DifficultyLevel = 'easy' | 'middle' | 'hard'

export interface RightAnswerTaskText {
  difficultyLevel: DifficultyLevel
  taskQuestion: string
  taskAnswers: RightAnswerTaskAnswer[]
}

export interface RightAnswerTask {
  title: string
  description: string
  taskText: RightAnswerTaskText[]
  parameters: string[]
}

type TaskType = RightAnswerTask

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
