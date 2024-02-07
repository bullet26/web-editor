import { FC, useState } from 'react'
import { message, Spin } from 'antd'
import { ViewModeContent, EditModeContent } from 'components'
import { useBlocksQuery } from 'hooks'

export const App: FC = () => {
  const [isEditMode, setEditModeStatus] = useState(true)

  const state = '1' // TODO state можно передать id урока например
  // const { data, isLoading, isSuccess, isError, error } = useBlocksQuery(state)

  // const data = queryClient.getQueryData(queryKey)
  // getQueryData is a synchronous function that can be used to get an existing query's cached data.

  const isLoading = false
  const isError = false
  const error = { message: '' }
  const isSuccess = true

  return (
    <>
      {isLoading && <Spin size="large" fullscreen />}
      {isError && message.error(error.message)}
      {isSuccess &&
        (isEditMode ? (
          <EditModeContent onViewClick={() => setEditModeStatus(false)} />
        ) : (
          <ViewModeContent onEditClick={() => setEditModeStatus(true)} />
        ))}
    </>
  )
}
