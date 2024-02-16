import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { getBlocks } from 'api'
import { DataType, DataTypeItem } from 'types'
import { generateId } from 'utils'

type BlockForCreate = Omit<DataTypeItem, 'savedInLibrary'> & {
  savedInLibrary?: boolean
}

interface IBlocks {
  data: DataType
  isLoading: boolean
  isError: boolean
  error: string | null
  fetchBlocks: () => void
  deleteBlock: (id: string) => void
  addBlock: (block: BlockForCreate) => void
  copyBlock: (id: string) => void
  moveBlock: (dragIndex: number, hoverIndex: number) => void
  saveInLibraryBlock: (id: string) => void
  unlinkFromLibraryBlock: (id: string) => void
}

export const useBlocks = create<IBlocks>()(
  persist(
    devtools((set, get) => ({
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set({ error: (error as any)?.message || 'На жаль щось пішло не так' })
        } finally {
          set({ isLoading: false })
        }
      },
      deleteBlock: (id: string) => set({ data: get().data.filter((item) => item.id !== id) }),
      addBlock: (block: BlockForCreate) => {
        if (!block.id) {
          set({ data: [...get().data, { ...block, savedInLibrary: false, id: generateId() }] })
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
      saveInLibraryBlock: (id: string) => {
        set({
          data: get().data.map((item) => {
            if (item.id === id) {
              return { ...item, savedInLibrary: true }
            }
            return item
          }),
        })
      },
      unlinkFromLibraryBlock: (id: string) => {
        set({
          data: get().data.map((item) => {
            if (item.id === id) {
              return { ...item, savedInLibrary: false }
            }
            return item
          }),
        })
      },
    })),
    { name: 'blocks' },
  ),
)
