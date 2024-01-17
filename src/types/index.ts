export type Type = 'title' | 'subtitle' | 'theme' | 'text' | 'image'

export type DataTypeItem = { text?: string; type: Type; id: string; url?: string }

export type DataType = DataTypeItem[]
