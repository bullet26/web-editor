/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { RightAnswerTask } from 'types'
import s from '../../TaskView.module.scss'

interface RightAnswerViewProps {
  data: RightAnswerTask | null
}

export const RightAnswerTaskView: FC<RightAnswerViewProps> = (props) => {
  const { data } = props

  return (
    <div className="view">
      <div
        className={s.taskText}
        dangerouslySetInnerHTML={{ __html: data?.taskText[0].taskQuestion || '' }}
      />
      <div className={s.answerBlockWrapper}>
        {data?.taskText[0].taskAnswers.map((item) => (
          <div className={s.answerGroupWrapper} key={item.id}>
            {item.answers.map(
              (subitem) =>
                subitem.value && (
                  <Button type="default" shape="round" key={subitem.id}>
                    {subitem.value}
                  </Button>
                ),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
