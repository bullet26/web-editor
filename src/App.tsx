import { FC, useState } from 'react'
import { ViewModeContent, EditModeContent } from 'components'

export const App: FC = () => {
  const [isEditMode, setEditModeStatus] = useState(true)

  return isEditMode ? (
    <EditModeContent onViewClick={() => setEditModeStatus(false)} />
  ) : (
    <ViewModeContent onEditClick={() => setEditModeStatus(true)} />
  )
}
