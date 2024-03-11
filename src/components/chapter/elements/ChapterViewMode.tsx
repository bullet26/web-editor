import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useBlocks } from 'store'
import s from './Chapter.module.scss'

export const ChapterViewMode: FC = () => {
  const data = useBlocks((state) => state.data)
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)
  const setSelectedChapterID = useBlocks((state) => state.setSelectedChapterID)

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const totalLength = data.chapters.length
    const selectedChapterIndex =
      data.chapters.findIndex((item) => item.id === selectedChapterID) + 1
    const percentValue = Math.round((selectedChapterIndex / totalLength) * 100)
    setPercent(percentValue)
  }, [data, selectedChapterID])

  return (
    <div>
      <div className={s.title}>Урок №1</div>
      <div className={s.percentWrapper}>
        <div className={s.percent} />
        <div className={s.activePercent} style={{ width: `${percent}px` }} />
        <div className={s.percentValue}>{percent}%</div>
      </div>
      <div className={s.chapterList}>
        {data?.chapters?.map((item) => (
          <div
            key={item.id}
            className={classNames(s.listItem, {
              [s.favChapter]: selectedChapterID === item.id,
            })}
            onClick={() => {
              setSelectedChapterID(item.id)
            }}>
            <div>{item.title}</div>
            {selectedChapterID === item.id && <div className={s.divider} />}
          </div>
        ))}
      </div>
    </div>
  )
}
