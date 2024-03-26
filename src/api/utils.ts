import { LessonType, LessonFromAPIType } from 'types'

export const preparedDataForPOSTRequest = (data: LessonType) => {
  const { title: name, chapters } = data

  const formattedChapters = chapters.map((item) => {
    const blocks = item.blocks.map((subitem) => {
      const { savedInLibrary, id, blockType, ...blockBody } = subitem
      if (savedInLibrary) {
        return { id, savedInLibrary, blockType, blockBody }
      }
      return { savedInLibrary, blockType, blockBody }
    })

    return { name: item.title, blocks }
  })

  return { name, chapters: formattedChapters }
}

export const preparedDataAfterGETRequest = (data: LessonFromAPIType): LessonType => {
  const { name: title, chapters } = data

  const formattedChapters = chapters.map((item) => {
    const blocks = item.blocks.map((subitem) => {
      return {
        ...subitem.blockBody,
        id: subitem.id,
        blockType: subitem.blockType,
        savedInLibrary: subitem.savedInLibrary,
      }
    })

    return { title: item.name, id: item.id, blocks }
  })

  return { title, chapters: formattedChapters }
}
