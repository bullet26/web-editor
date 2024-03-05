/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { DeleteIcon } from 'assets'
import s from '../AddSkip.module.scss'

interface InputProps {
  groupId: string
  number: number
  itemId: string
  placeholder?: string
  value: string
  onChange: (groupId: string, itemId: string, value: string) => void
  onDelete: (groupId: string, itemId: string) => void
}

export const AlwaysCorrectAnswerInput: FC<InputProps> = (props) => {
  const { groupId, itemId, value, placeholder, number, onChange, onDelete } = props
  const { TextArea } = AntInput

  const colorText = '#2D8CFF'
  let text
  if (number === 1) {
    text = 'Відповідь'
  } else if (number > 1) {
    text = 'Правильна'
  }

  return (
    <div>
      <div style={{ color: colorText }} className={s.answerTitle}>
        <span>{text}</span>
        <DeleteIcon fill={colorText} onClick={() => onDelete(groupId, itemId)} />
      </div>
      <TextArea
        autoSize
        placeholder={placeholder || 'Введіть слово'}
        id={itemId}
        value={value}
        onChange={(e) => onChange(groupId, itemId, e?.target.value)}
      />
    </div>
  )
}
