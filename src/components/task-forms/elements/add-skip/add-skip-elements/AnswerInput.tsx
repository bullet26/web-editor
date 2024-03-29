/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { DeleteIcon } from 'assets'
import s from '../AddSkip.module.scss'

interface InputProps {
  groupId: string
  itemId: string
  placeholder?: string
  type: 'correct' | 'incorrect'
  value: string
  onChange: (groupId: string, itemId: string, value: string) => void
  onDelete: (groupId: string, itemId: string) => void
}

export const AnswerInput: FC<InputProps> = (props) => {
  const { groupId, itemId, value, placeholder, type, onChange, onDelete } = props
  const { TextArea } = AntInput

  let colorText
  let text
  if (type === 'correct') {
    colorText = '#2D8CFF'
    text = 'Відповідь'
  } else if (type === 'incorrect') {
    colorText = '#EC2028'
    text = 'Неправильна'
  }

  return (
    <div>
      <div style={{ color: colorText }} className={s.answerTitle}>
        <span>{text}</span>
        {type === 'incorrect' && (
          <DeleteIcon fill={colorText} onClick={() => onDelete(groupId, itemId)} />
        )}
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
