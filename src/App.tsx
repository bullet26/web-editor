import { FC, useState, useEffect } from 'react'
import { message, Spin } from 'antd'
import { useBlocks } from 'store'
import { EditPage, ViewPage } from 'pages'
import { useBubbleState } from 'provider'
import { ComponentStateType } from 'main'

export const App: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const fetchBlocks = useBlocks((state) => state.fetchBlocks)
  const isLoading = useBlocks((state) => state.isLoading)
  const isError = useBlocks((state) => state.isError)
  const error = useBlocks((state) => state.error)

  const [isEditMode, setEditModeStatus] = useState(true)
  const state = useBubbleState<ComponentStateType>()

  useEffect(() => {
    fetchBlocks(state.apiKey, state.versionId)
  }, [])

  console.log('value from Bubble State Manager:', state.value)
  // console.log('apiKey from Bubble State Manager:', state.apiKey)
  console.log('versionId from Bubble State Manager:', state.versionId)

  return (
    <>
      {contextHolder}
      {isLoading && <Spin size="large" fullscreen />}
      {isError &&
        messageApi.open({
          type: 'error',
          content: error,
        })}
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
