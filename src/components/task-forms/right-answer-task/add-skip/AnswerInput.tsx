/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { DeleteIcon } from 'assets'
import s from '../RAElements.module.scss'

interface InputProps {
  id: string
  placeholder?: string
  type: 'correct' | 'incorrect'
  value: string
  color?: string
  itemNumber: number
  onChange: (id: string, value: string) => void
  onDelete: (type: 'correct' | 'incorrect', id: string) => void
}

export const AnswerInput: FC<InputProps> = (props) => {
  const { id, value, placeholder, type, color, itemNumber, onChange, onDelete } = props
  const { TextArea } = AntInput

  let colorText
  let text
  if (type === 'correct') {
    colorText = color || 'purple'
    text = `Відповідь ${itemNumber + 1}`
  } else if (type === 'incorrect') {
    colorText = '#EC2028'
    text = 'Неправильна'
  }

  return (
    <div>
      <div style={{ color: colorText }} className={s.answerTitle}>
        <span>{text}</span>
        <DeleteIcon fill={colorText} onClick={() => onDelete(type, id)} />
      </div>
      <TextArea
        autoSize
        placeholder={placeholder || 'Введіть слово'}
        id={id}
        value={value}
        onChange={(e) => onChange(id, e?.target.value)}
      />
    </div>
  )
}
