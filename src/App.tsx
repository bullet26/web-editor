import { FC, useState, useEffect } from 'react'
import { message, Spin, Flex } from 'antd'
import { ViewModeContent, EditModeContent, ChapterPanel } from 'components'
import { useBlocks } from 'store'
import { Dictionary } from 'UI'

export const App: FC = () => {
  const fetchBlocks = useBlocks((state) => state.fetchBlocks)
  const isLoading = useBlocks((state) => state.isLoading)
  const isError = useBlocks((state) => state.isError)
  const error = useBlocks((state) => state.error)
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)

  const [isEditMode, setEditModeStatus] = useState(true)

  // TODO get dataAPI from API
  useEffect(() => {
    //fetchBlocks()
  }, [])

  return (
    <>
      {isLoading && <Spin size="large" fullscreen />}
      {isError && message.error(error)}
      {!isLoading &&
        !isError &&
        (isEditMode ? (
          <Flex align="start" gap="24px">
            <ChapterPanel mode="edit" />
            {selectedChapterID && <EditModeContent onViewClick={() => setEditModeStatus(false)} />}
            <Dictionary mode="edit" />
          </Flex>
        ) : (
          <Flex align="start" gap="24px">
            <ChapterPanel mode="view" />
            {selectedChapterID && <ViewModeContent onEditClick={() => setEditModeStatus(true)} />}
            <Dictionary mode="view" />
          </Flex>
        ))}
    </>
  )
}
