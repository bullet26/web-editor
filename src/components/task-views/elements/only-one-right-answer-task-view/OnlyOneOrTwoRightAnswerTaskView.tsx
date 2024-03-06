/* eslint-disable react/no-danger */
import { FC, useEffect, useState } from 'react'
import { Button } from 'antd'
import { RightAnswerTask } from 'types'
import s from '../../TaskView.module.scss'

interface OnlyOneOrTwoRightAnswerTaskViewProps {
  data: RightAnswerTask | null
}

export const OnlyOneOrTwoRightAnswerTaskView: FC<OnlyOneOrTwoRightAnswerTaskViewProps> = (
  props,
) => {
  const { data } = props

  const [formattedAnswers, setFormattedAnswers] = useState<
    { id: string; type: 'correct' | 'incorrect'; value: string }[]
  >([])

  useEffect(() => {
    const newAnswers: { id: string; type: 'correct' | 'incorrect'; value: string }[] = []
    data?.taskText[0].taskAnswers.forEach((item, i) => {
      item.answers.forEach((subitem, index) => {
        if (i === 0) {
          newAnswers.push({ id: subitem.id, type: subitem.type, value: subitem.value })
        } else {
          newAnswers[index].value = [newAnswers[index].value, subitem.value].join(' / ')
        }
      })
    })
    setFormattedAnswers(newAnswers)
  }, [data])

  return (
    <div className="view">
      <div
        className={s.taskText}
        dangerouslySetInnerHTML={{ __html: data?.taskText[0].taskQuestion || '' }}
      />
      <div className={s.answerBlockWrapper}>
        {formattedAnswers.map((item) => (
          <div className={s.answerInColumnGroupWrapper} key={item.id}>
            {item.value && (
              <Button type="default" shape="round" key={item.id}>
                {item.value}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
