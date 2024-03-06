/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput, Button } from 'antd'
import classNames from 'classnames'
import { DeleteIcon } from 'assets'
import s from '../AddSkip.module.scss'

interface InputProps {
  groupId: string
  itemId: string
  placeholder?: string
  type: 'correct' | 'incorrect'
  value: string
  groupNumber: number
  groupQuant: number
  elementNumber: number
  elemQuant: number
  onChange: (groupId: string, itemId: string, value: string) => void
  onDeleteItem: (groupId: string, itemId: string) => void
  addAnswerItem: (groupId: string) => void
  onDeleteGroup: (groupId: string) => void
}

export const OnlyOneOrTwoAnswerInput: FC<InputProps> = (props) => {
  const {
    groupId,
    itemId,
    placeholder,
    type,
    value,
    groupNumber,
    groupQuant,
    elementNumber,
    elemQuant,
    onChange,
    addAnswerItem,
    onDeleteItem,
    onDeleteGroup,
  } = props

  let colorText
  let text
  if (type === 'correct') {
    colorText = '#2D8CFF'
    text = groupNumber === 2 ? 'Подвійна' : 'Правильна'
  } else if (type === 'incorrect') {
    colorText = '#EC2028'
    text = 'Неправильна'
  }

  return (
    <div className={s.buttonItemWrapper}>
      <div className={s.answerItemWrapper}>
        <div style={{ color: colorText }} className={s.answerTitle}>
          <span>{text}</span>
          {type === 'correct' && (
            <DeleteIcon fill={colorText} onClick={() => onDeleteGroup(groupId)} />
          )}
        </div>
        <div
          className={classNames({
            [s.answerInputWrapper]: type === 'incorrect',
            [s.answerCorrectInputWrapper]: type === 'correct' && groupNumber === 1,
          })}>
          {type === 'incorrect' && groupNumber === 1 && (
            <DeleteIcon fill={colorText} onClick={() => onDeleteItem(groupId, itemId)} />
          )}
          <AntInput
            maxLength={115}
            placeholder={placeholder || 'Введіть слово'}
            id={itemId}
            style={{ marginLeft: '25x' }}
            value={value}
            onChange={(e) => onChange(groupId, itemId, e?.target.value)}
          />
        </div>
      </div>
      {groupQuant === 2 && groupNumber === 1 && <span className={s.slash}>/</span>}
      {groupQuant === groupNumber && elemQuant === elementNumber && elemQuant < 4 && (
        <Button
          shape="circle"
          type="default"
          className="redBtn"
          style={{ width: '32px', marginLeft: '5px' }}
          onClick={() => addAnswerItem(groupId)}>
          +
        </Button>
      )}
    </div>
  )
}
