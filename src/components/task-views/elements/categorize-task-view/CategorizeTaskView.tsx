import { FC, useEffect, useState } from 'react'
import { CategorizeTask } from 'types'
import s from './CategorizeTaskView.module.scss'

interface CategorizeTaskViewProps {
  data: CategorizeTask | null
}

export const CategorizeTaskView: FC<CategorizeTaskViewProps> = (props) => {
  const { data } = props
  const [mainWords, setMainWords] = useState<{ id: string; word: string }[]>([])
  const [otherWords, setOtherWords] = useState<{ id: string; word: string; groupNumber: number }[]>(
    [],
  )
  const [rowCount, setRowCount] = useState(0)

  useEffect(() => {
    if (data) {
      let newRowCount = 0

      const newMainWords = data?.taskText[0].groups.map((item) => ({
        id: item.id,
        word: item.mainWord,
      }))

      const newOtherWords = data?.taskText[0].groups.flatMap((item, i) => {
        newRowCount = item.otherWords.length > newRowCount ? item.otherWords.length : newRowCount
        return item.otherWords.map((subitem) => ({
          id: subitem.id,
          word: subitem.word,
          groupNumber: i + 1,
        }))
      })

      setMainWords(newMainWords)
      setOtherWords(newOtherWords)
      setRowCount(newRowCount)
    }
  }, [data])

  return (
    <div>
      <div className={s.groupWrapper}>
        {mainWords.map((item) => (
          <div className={s.groupBlock} key={item.id}>
            <div className={s.groupBlockTitle}>{item.word}</div>
          </div>
        ))}
      </div>
      <div
        className={s.wordsWrapper}
        style={{
          gridTemplateColumns: `repeat(${mainWords.length}, minmax(150px, 1fr))`,
          gridTemplateRows: `repeat(${rowCount},  minmax(44px, auto))`,
        }}>
        {otherWords.map((item) => (
          <div key={item.id} className={s.otherWords} style={{ gridColumnStart: item.groupNumber }}>
            {item.word}
          </div>
        ))}
      </div>
    </div>
  )
}
