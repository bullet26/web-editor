import { FC } from 'react'
import { ChapterEditMode, ChapterViewMode } from './elements'

interface ChapterPanelProps {
  mode: 'edit' | 'view'
}

export const ChapterPanel: FC<ChapterPanelProps> = (props) => {
  const { mode } = props

  return (
    <>
      {mode === 'edit' && <ChapterEditMode />}
      {mode === 'view' && <ChapterViewMode />}
    </>
  )
}
