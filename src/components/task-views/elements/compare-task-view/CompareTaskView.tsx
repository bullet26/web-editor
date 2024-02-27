/* eslint-disable react/no-danger */
import { FC, useEffect, useState } from 'react'
import { Button } from 'antd'
import { CompareTask } from 'types'
import s from './CompareTaskView.module.scss'

interface CompareTaskViewProps {
  data: CompareTask | null
}

export const CompareTaskView: FC<CompareTaskViewProps> = (props) => {
  const { data } = props
  const [leftWords, setLeftWords] = useState<{ id: string; word: string }[]>([])
  const [rightWords, setRightWords] = useState<{ id: string; word: string }[]>([])

  useEffect(() => {
    if (data) {
      const newLeftWords = data?.taskText[0]?.wordPairs.map((item) => ({
        id: item.id,
        word: item.left,
      }))

      const newRightWords = data?.taskText[0]?.wordPairs.map((item) => ({
        id: item.id,
        word: item.right,
      }))

      setLeftWords(newLeftWords)
      setRightWords(newRightWords)
    }
  }, [data])

  return (
    <div className="view">
      {leftWords.map((item) => (
        <div key={item.id} className={s.compareTaskGroupItem}>
          <div className={s.leftPart}>{item.word}</div>
          <span>-</span>
          <div className={s.rightPart} />
        </div>
      ))}
      <div className={s.rightPartWordsWrapper}>
        {rightWords.map((item) => (
          <Button key={item.id} type="default">
            {item.word}
          </Button>
        ))}
      </div>
    </div>
  )
}
