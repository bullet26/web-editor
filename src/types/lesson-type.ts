import { BlockTYPE, DataType, DataTypeItem } from 'types'

export interface ChapterType {
  id: string
  title: string
  blocks: DataType
}

export interface LessonType {
  title: string
  chapters: ChapterType[]
}

export interface LessonFromAPIType {
  name: string
  type: string
  chapters: {
    id: string
    name: string
    blocks: {
      id: string
      blockType: BlockTYPE
      savedInLibrary: boolean
      blockBody: DataTypeItem
    }[]
  }[]
}
