/* eslint-disable react/no-danger */
import { FC, useState } from 'react'
import { Button } from 'antd'
import { TrueOrFalseTask } from 'types'
import s from './TrueOrFalseTaskView.module.scss'

interface TrueOrFalseTaskViewProps {
  data: TrueOrFalseTask | null
}

export const TrueOrFalseTaskView: FC<TrueOrFalseTaskViewProps> = (props) => {
  const { data } = props
  const [value, setValue] = useState<boolean | null>(null)
  const fieldFormat = data?.taskText[0].taskItemData.format

  return (
    <>
      <div className={s.question}>{data?.taskText[0].taskItemData.question}</div>
      <Button
        style={{
          width: '100%',
          marginBottom: '16px',
          backgroundColor: value === true ? '#D5E8FF' : '',
        }}
        onClick={() => setValue(true)}>
        {fieldFormat === 'trueOrFalse' ? 'Правда' : 'Так'}
      </Button>
      <Button
        style={{
          width: '100%',
          marginBottom: '24px',
          backgroundColor: value === false ? '#D5E8FF' : '',
        }}
        onClick={() => setValue(false)}>
        {fieldFormat === 'trueOrFalse' ? 'Неправда' : 'Ні'}
      </Button>
    </>
  )
}
