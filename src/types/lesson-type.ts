import { DataType } from 'types'

export interface ChapterType {
  id: string
  title: string
  blocks: DataType
}

export interface LessonType {
  id: string
  title: string
  chapters: ChapterType[]
}
