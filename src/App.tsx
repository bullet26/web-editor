import { FC, useState } from 'react'
import { CreateModeContent, ViewModeContent, EditModeContent } from 'components'
import { useMyContext } from 'provider'

export const App: FC = () => {
  const [isEditMode, setEditModeStatus] = useState(false)
  const { isContentConsist } = useMyContext()

  return isContentConsist ? (
    isEditMode ? (
      <EditModeContent onViewClick={() => setEditModeStatus(false)} />
    ) : (
      <ViewModeContent onEditClick={() => setEditModeStatus(true)} />
    )
  ) : (
    <CreateModeContent />
  )
}
