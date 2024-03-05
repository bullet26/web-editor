/* eslint-disable react/no-danger */
import { FC, useState } from 'react'
import { Input } from 'antd'
import { CorrectMistakesTask } from 'types'
import s from './CorrectMistakesTaskView.module.scss'

interface TypeAnswerViewProps {
  data: CorrectMistakesTask | null
}

export const CorrectMistakesTaskView: FC<TypeAnswerViewProps> = (props) => {
  const { data } = props
  const { TextArea } = Input

  const [value, setValue] = useState(data?.taskText[0].wrongSentence)

  return (
    <div className="view">
      <TextArea
        className={s.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoSize
      />
    </div>
  )
}
