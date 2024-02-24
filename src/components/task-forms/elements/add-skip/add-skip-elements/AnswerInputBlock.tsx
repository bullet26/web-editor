import { FC, RefObject } from 'react'
import { useField } from 'formik'
import { Button } from 'antd'
import { DeleteIcon } from 'assets'
import { RightAnswerTaskAnswer, RightAnswerTaskItem } from 'types'
import { generateId } from 'utils'
import { updateCircleNumber } from '../utils'
import { AnswerInput } from './AnswerInput'
import s from '../AddSkip.module.scss'

interface AnswerInputBlockProps {
  inputName: string
  answerBlockName: string
  inputRef: RefObject<HTMLElement>
}

export const AnswerInputBlock: FC<AnswerInputBlockProps> = (props) => {
  const { inputName, answerBlockName, inputRef } = props

  const [fieldAnswer, , helpersAnswer] = useField(answerBlockName)
  const [fieldTaskQuestion, , helpersTaskQuestion] = useField(inputName)

  const onChangeAnswer = (groupId: string, itemId: string, value: string) => {
    const fieldValueS = fieldAnswer.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        const answers = item.answers.map((subitem) => {
          if (subitem.id === itemId) {
            return { ...subitem, value }
          }
          return subitem
        })
        return { ...item, answers }
      }
      return item
    })

    helpersAnswer.setValue(fieldValueS, true)
  }

  const addWrongAnswer = (groupId: string) => {
    const currentValue: RightAnswerTaskItem = {
      type: 'incorrect',
      id: generateId(),
      value: '',
    }

    const fieldValueS = fieldAnswer.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        return { ...item, answers: [...item.answers, currentValue] }
      }
      return item
    })

    helpersAnswer.setValue(fieldValueS, true)
  }

  const onDeleteSkipGroup = (id: string) => {
    if (inputRef.current) {
      const regex = new RegExp(`&nbsp;<div[^>]*data-skip="${id}"[^>]*>.*?<\\/div>&nbsp;`, 'g')
      const fieldValueWithoutDeletedItem = fieldTaskQuestion.value.replace(regex, '')
      const updatedFieldValue = updateCircleNumber(fieldValueWithoutDeletedItem)

      helpersTaskQuestion.setValue(updatedFieldValue, true)
    }

    const fieldValueS = fieldAnswer.value.filter((item: RightAnswerTaskAnswer) => item.id !== id)
    helpersAnswer.setValue(fieldValueS, true)
  }

  const onDeleteWrongAnswer = (groupId: string, itemId: string) => {
    const fieldValueS = fieldAnswer.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        return {
          ...item,
          answers: item?.answers.filter((subitem: RightAnswerTaskItem) => subitem.id !== itemId),
        }
      }
      return item
    })

    helpersAnswer.setValue(fieldValueS, true)
  }

  return (
    <div className={s.answerBlockWrapper}>
      {fieldAnswer.value.map((item: RightAnswerTaskAnswer, i: number) => (
        <div className={s.answerGroupWrapper} key={item.id}>
          <div className={s.answerGroupIconWrapper}>
            <div className="circleSmall">{i + 1}</div>
            <DeleteIcon fill="#EC2028" onClick={() => onDeleteSkipGroup(item.id)} />
          </div>
          {item.answers.map((subitem) => (
            <AnswerInput
              groupId={item.id}
              itemId={subitem.id}
              {...subitem}
              onChange={onChangeAnswer}
              key={subitem.id}
              onDelete={onDeleteWrongAnswer}
            />
          ))}
          {item.answers.length < 5 && (
            <Button
              shape="circle"
              type="default"
              className="blueBtn"
              style={{ width: '32px' }}
              onClick={() => addWrongAnswer(item.id)}>
              +
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}