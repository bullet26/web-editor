import { FC, useState, useEffect } from 'react'
import { message, Spin } from 'antd'
import { useBlocks } from 'store'
import { EditPage, ViewPage } from 'pages'

export const App: FC = () => {
  const fetchBlocks = useBlocks((state) => state.fetchBlocks)
  const isLoading = useBlocks((state) => state.isLoading)
  const isError = useBlocks((state) => state.isError)
  const error = useBlocks((state) => state.error)

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
          <EditPage setEditModeStatus={setEditModeStatus} />
        ) : (
          <ViewPage setEditModeStatus={setEditModeStatus} />
        ))}
    </>
  )
}
