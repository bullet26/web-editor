export const types = ['title', 'subtitle', 'custom', 'note', 'image', 'table', 'rightAnswerTask']

export type Type = (typeof types)[number]

export interface RightAnswerTaskAnswer {
  id: string
  type: 'correct' | 'incorrect'
  value: string
  color?: string
}

export interface RightAnswerTask {
  code: string
  title: string
  difficultyLevel: 'easy' | 'middle' | 'hard'
  subtitle: string
  taskText: string
  taskAnswers: RightAnswerTaskAnswer[]
  parameters: string[]
}

type TaskType = RightAnswerTask

export type DataTypeItem = {
  text?: string
  type: Type
  id: string
  url?: string
  taskData?: TaskType
  tableColumns?: DataTypeItem[]
  imageCaption?: string
}

export type DataType = DataTypeItem[]

export type DataTypeItemTask = Pick<DataTypeItem, 'type' | 'id'> & {
  taskData: TaskType
}
