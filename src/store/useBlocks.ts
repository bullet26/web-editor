/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import { getLessonByVersionId, saveLesson, updateLessonByVersionId } from 'api'
import { LessonType, DataTypeItem, DataType, BlockTYPE } from 'types'
import { IsTaskType, generateId } from 'utils'

type BlockForCreate = Omit<DataTypeItem, 'savedInLibrary' | 'blockType'> & {
  savedInLibrary?: boolean
  blockType?: BlockTYPE
}

interface IBlocks {
  data: LessonType
  getBlocksInCurrentChapter: () => DataType
  isLoading: boolean
  isError: boolean
  error: string | null
  selectedChapterID: string | null
  fetchBlocks: (accessToken: string, versionId: string) => void
  uploadBlocks: (accessToken: string, versionId?: string) => Promise<string>
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
  devtools((set, get) => ({
    data: { title: '', chapters: [] },
    isLoading: false,
    isError: false,
    error: null,
    selectedChapterID: null,
    fetchBlocks: async (accessToken: string, versionId: string) => {
      try {
        set({ isLoading: true })
        const data = await getLessonByVersionId(accessToken, versionId)
        set({ data })
        set({ isError: false })
        set({ error: null })
      } catch (error) {
        set({ isError: true })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set({ error: (error as any)?.message || 'На жаль щось пішло не так' })
      } finally {
        set({ isLoading: false })
        setTimeout(() => {
          set({ isError: false })
          set({ error: null })
        }, 3000)
      }
    },
    uploadBlocks: async (accessToken: string, versionId?: string) => {
      let newVersionId = ''
      try {
        set({ isLoading: true })
        const { data } = get()
        if (versionId) {
          newVersionId = await updateLessonByVersionId(accessToken, data, versionId)
        } else {
          newVersionId = await saveLesson(accessToken, data)
        }
        set({ isError: false })
        set({ error: null })
        return newVersionId
      } catch (error) {
        set({ isError: true })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set({ error: (error as any)?.message || 'На жаль щось пішло не так' })
        return ''
      } finally {
        set({ isLoading: false })
        setTimeout(() => {
          set({ isError: false })
          set({ error: null })
        }, 3000)
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
      let blockType: BlockTYPE = 'NON_INTERACTIVE'
      if (!!block.type && IsTaskType(block.type)) {
        blockType = 'INTERACTIVE'
      }

      set({
        data: {
          ...get().data,
          chapters: get().data.chapters.map((item) => {
            if (item.id === get().selectedChapterID) {
              let blocksNew = item.blocks

              if (!block.id) {
                blocksNew = [
                  ...item.blocks,
                  { ...block, savedInLibrary: false, id: generateId(), blockType },
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
                blocks: item.blocks.toSpliced(dragIndex, 1).toSpliced(hoverIndex, 0, draggedBlock),
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
)
