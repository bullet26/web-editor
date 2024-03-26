import { FC } from 'react'
import { useBlocks } from 'store'
import { EditModeContent, ChapterPanel } from 'components'
import { Dictionary } from 'UI'
import s from './Pages.module.scss'

interface EditPageProps {
  setEditModeStatus: (value: boolean) => void
}

export const EditPage: FC<EditPageProps> = (props) => {
  const { setEditModeStatus } = props
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)

  const chapterWidth = 186
  const dictionaryWidth = 195
  const wrapperWidth = document.getElementById('root')?.clientWidth ?? window.innerWidth

  const width = wrapperWidth - chapterWidth - dictionaryWidth

  return (
    <>
      <div className={s.chapterWrapper}>
        <ChapterPanel mode="edit" />
      </div>
      <div style={{ maxWidth: `${width}px`, marginLeft: `${chapterWidth}px` }}>
        {selectedChapterID ? (
          <EditModeContent onViewClick={() => setEditModeStatus(false)} />
        ) : (
          <div className={s.largeText}>Оберіть розділ уроку</div>
        )}
      </div>
      <div className={s.dictionaryWrapper}>
        <Dictionary mode="edit" />
      </div>
    </>
  )
}
