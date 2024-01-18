export const types = ['title', 'subtitle', 'custom', 'note', 'text', 'image']

export type Type = (typeof types)[number]

export type DataTypeItem = { text?: string; type: Type; id: string; url?: string; theme?: string }

export type DataType = DataTypeItem[]
