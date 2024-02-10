import { create } from 'zustand'
import { getBlocks } from 'api'
import { DataType, DataTypeItem } from 'types'
import { generateId } from 'utils'

interface IBlocks {
  data: DataType
  isLoading: boolean
  isError: boolean
  error: string | null
  fetchBlocks: () => void
  deleteBlock: (id: string) => void
  addBlock: (block: DataTypeItem) => void
  copyBlock: (id: string) => void
  moveBlock: (dragIndex: number, hoverIndex: number) => void
}

export const useBlocks = create<IBlocks>()((set, get) => ({
  data: [],
  isLoading: false,
  isError: false,
  error: null,
  fetchBlocks: async () => {
    try {
      set({ isLoading: true })
      const data = await getBlocks()
      set({ data })
      set({ isError: false })
      set({ error: null })
    } catch (error) {
      set({ isError: true })
      set({ error: error?.message || 'На жаль щось пішло не так' })
    } finally {
      set({ isLoading: false })
    }
  },
  deleteBlock: (id: string) => set({ data: get().data.filter((item) => item.id !== id) }),
  addBlock: (block: DataTypeItem) => {
    if (!block.id) {
      set({ data: [...get().data, { ...block, id: generateId() }] })
    } else {
      set({
        data: get().data.map((item) => {
          if (item.id === block.id) {
            return { ...item, ...block }
          }
          return item
        }),
      })
    }
  },
  copyBlock: (id: string) => {
    const block = get().data.find((item) => item.id === id)
    const index = get().data.findIndex((item) => item.id === id)

    if (!block) {
      return
    }
    set({ data: get().data.toSpliced(index, 0, { ...block, id: generateId() }) })
  },
  moveBlock: (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = get().data[dragIndex]
    set({ data: get().data.toSpliced(dragIndex, 1).toSpliced(hoverIndex, 0, draggedBlock) })
  },
}))
