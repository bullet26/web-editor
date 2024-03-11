/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { produce } from 'immer'
import { getBlocks } from 'api'
import { LessonType, DataTypeItem, DataType } from 'types'
import { generateId } from 'utils'

type BlockForCreate = Omit<DataTypeItem, 'savedInLibrary'> & {
  savedInLibrary?: boolean
}

interface IBlocks {
  data: LessonType
  getBlocksInCurrentChapter: () => DataType
  isLoading: boolean
  isError: boolean
  error: string | null
  selectedChapterID: string | null
  fetchBlocks: () => void
  addChapter: () => string
  deleteChapter: (id: string) => void
  updateChapter: ({ id, title }: { id: string; title: string }) => void
  setSelectedChapterID: (id: string | null) => void
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
      data: { id: generateId(), title: '', chapters: [] },
      isLoading: false,
      isError: false,
      error: null,
      selectedChapterID: null,
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
      getBlocksInCurrentChapter: () => {
        return get().data.chapters.find((item) => item.id === get().selectedChapterID)?.blocks || []
      },
      addChapter: () => {
        const id = generateId()
        set(
          produce((state) => {
            state.data.chapters.push({ id, title: '', blocks: [] })
          }),
        )
        return id
      },
      deleteChapter: (id: string) => {
        if (id === get().selectedChapterID) {
          set({ selectedChapterID: get().data.chapters[0].id || null })
        }
        set({
          data: {
            ...get().data,
            chapters: get().data?.chapters.filter((item) => item.id !== id),
          },
        })
      },
      setSelectedChapterID: (id: string | null) => {
        set({ selectedChapterID: id })
      },
      updateChapter: ({ id, title }: { id: string; title: string }) => {
        set({
          data: {
            ...get().data,
            chapters: get().data?.chapters.map((item) => {
              if (item.id === id) {
                return { ...item, title }
              }
              return item
            }),
          },
        })
      },
      deleteBlock: (id: string) => {
        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                return { ...item, blocks: item.blocks.filter((subitem) => subitem.id !== id) }
              }
              return item
            }),
          },
        })
      },
      addBlock: (block: BlockForCreate) => {
        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                let blocksNew = item.blocks
                if (!block.id) {
                  blocksNew = [
                    ...item.blocks,
                    { ...block, savedInLibrary: false, id: generateId() },
                  ]
                } else {
                  blocksNew = item.blocks.map((subitem) => {
                    if (subitem.id === block.id) {
                      return { ...subitem, ...block }
                    }
                    return subitem
                  })
                }
                return {
                  ...item,
                  blocks: blocksNew,
                }
              }
              return item
            }),
          },
        })
      },
      copyBlock: (id: string) => {
        const block = get()
          .data.chapters.find((item) => item.id === get().selectedChapterID)
          ?.blocks.find((item) => item.id === id)

        if (!block) {
          return
        }

        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                const index =
                  item.blocks.findIndex((subitem) => subitem.id === id) ?? item.blocks.length
                return {
                  ...item,
                  blocks: item.blocks.toSpliced(index, 0, { ...block, id: generateId() }),
                }
              }
              return item
            }),
          },
        })
      },
      moveBlock: (dragIndex: number, hoverIndex: number) => {
        const draggedBlock = get().data.chapters.find((item) => item.id === get().selectedChapterID)
          ?.blocks[dragIndex]
        if (!draggedBlock) {
          return
        }
        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                return {
                  ...item,
                  blocks: item.blocks
                    .toSpliced(dragIndex, 1)
                    .toSpliced(hoverIndex, 0, draggedBlock),
                }
              }
              return item
            }),
          },
        })
      },
      saveInLibraryBlock: (id: string) => {
        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                return {
                  ...item,
                  blocks: item.blocks.map((subitem) => {
                    if (subitem.id === id) {
                      return { ...subitem, savedInLibrary: true }
                    }
                    return subitem
                  }),
                }
              }
              return item
            }),
          },
        })
      },
      unlinkFromLibraryBlock: (id: string) => {
        set({
          data: {
            ...get().data,
            chapters: get().data.chapters.map((item) => {
              if (item.id === get().selectedChapterID) {
                return {
                  ...item,
                  blocks: item.blocks.map((subitem) => {
                    if (subitem.id === id) {
                      return { ...subitem, savedInLibrary: false }
                    }
                    return subitem
                  }),
                }
              }
              return item
            }),
          },
        })
      },
    })),
    { name: 'blocks' },
  ),
)
