import { FC } from 'react'
import { useBlocks } from 'store'
import { ChapterPanel, ViewModeContent } from 'components'
import { Dictionary } from 'UI'
import s from './Pages.module.scss'

interface ViewPageProps {
  setEditModeStatus: (value: boolean) => void
}

export const ViewPage: FC<ViewPageProps> = (props) => {
  const { setEditModeStatus } = props
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)

  const chapterWidth = 150
  const dictionaryWidth = 195
  const wrapperWidth = document.getElementById('root')?.clientWidth ?? window.innerWidth

  const width = wrapperWidth - chapterWidth - dictionaryWidth

  return (
    <>
      <div className={s.chapterWrapper}>
        <ChapterPanel mode="view" />
      </div>
      <div style={{ maxWidth: `${width}px`, marginLeft: `${chapterWidth}px` }}>
        {selectedChapterID && <ViewModeContent onEditClick={() => setEditModeStatus(true)} />}
      </div>
      <div className={s.dictionaryWrapper}>
        <Dictionary mode="view" />
      </div>
    </>
  )
}
