export const types = ['title', 'subtitle', 'custom', 'note', 'text', 'image', 'rightAnswerTask']

export type Type = (typeof types)[number]

export interface RightAnswerTaskAnswer {
  id: string
  type: 'correct' | 'incorrect'
  skipNumber?: number
  value: string
  color?: string
}

export interface RightAnswerTask {
  code: string
  title: string
  difficultyLevel: 'easy' | 'middle' | 'hard'
  subtitle: string
  taskText: string | TrustedHTML
  taskAnswers: RightAnswerTaskAnswer[]
  parameters: string[]
}

type TaskType = RightAnswerTask

export type DataTypeItem = {
  text?: string
  type: Type
  id: string
  url?: string
  theme?: string
  taskData?: TaskType
}

export type DataType = DataTypeItem[]

export type DataTypeItemTask = Pick<DataTypeItem, 'type' | 'id'> & {
  taskData: TaskType
}
