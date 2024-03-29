/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button, Divider } from 'antd'
import { TaskWithoutAnswer } from 'types'
import s from '../../TaskView.module.scss'

interface CorrectOrderSplitSentenceViewProps {
  data: TaskWithoutAnswer | null
}

export const CorrectOrderSplitSentenceView: FC<CorrectOrderSplitSentenceViewProps> = (props) => {
  const { data } = props

  return (
    <div className="view">
      <div className={s.taskTextAloneBlock}>
        <Divider />
        <Divider style={{ marginTop: '48px' }} />
        {data?.taskText[0].taskQuestion.split(' ').map((item, i) => (
          <Button key={i} style={{ marginRight: '8px', marginBottom: '10px' }}>
            {item || ''}
          </Button>
        ))}
      </div>
    </div>
  )
}
