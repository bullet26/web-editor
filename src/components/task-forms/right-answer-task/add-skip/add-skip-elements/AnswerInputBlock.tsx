import { FC, RefObject } from 'react'
import { useField } from 'formik'
import { Button } from 'antd'
import { DeleteIcon } from 'assets'
import { RightAnswerTaskAnswer, RightAnswerTaskItem } from 'types'
import { generateId } from 'utils'
import { AnswerInput } from './AnswerInput'
import s from '../../RAElements.module.scss'

interface AnswerInputBlockProps {
  inputName: string
  answerBlockName: string
  inputRef: RefObject<HTMLElement>
}

export const AnswerInputBlock: FC<AnswerInputBlockProps> = (props) => {
  const { inputName, answerBlockName, inputRef } = props

  const [field, , helpers] = useField(answerBlockName)
  const [fieldTaskText, , helpersTaskText] = useField(inputName)

  const onChangeAnswer = (groupId: string, itemId: string, value: string) => {
    const fieldValueS = field.value.map((item: RightAnswerTaskAnswer) => {
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

    helpers.setValue(fieldValueS, true)
  }

  const addWrongAnswer = (groupId: string) => {
    const currentValue: RightAnswerTaskItem = {
      type: 'incorrect',
      id: generateId(),
      value: '',
    }

    const fieldValueS = field.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        return { ...item, answers: [...item.answers, currentValue] }
      }
      return item
    })

    helpers.setValue(fieldValueS, true)
  }

  const onDeleteSkipGroup = (id: string) => {
    if (inputRef.current) {
      const regex = new RegExp(`<span[^>]*data-skip="${id}"[^>]*><\/span>`, 'g')
      const prevStateFieldValue = fieldTaskText.value

      helpersTaskText.setValue(prevStateFieldValue.replace(regex, ''), true)
    }

    const fieldValueS = field.value.filter((item: RightAnswerTaskAnswer) => item.id !== id)
    helpers.setValue(fieldValueS, true)
  }

  const onDeleteWrongAnswer = (groupId: string, itemId: string) => {
    const fieldValueS = field.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        return {
          ...item,
          answers: item?.answers.filter((subitem: RightAnswerTaskItem) => subitem.id !== itemId),
        }
      }
      return item
    })

    helpers.setValue(fieldValueS, true)
  }

  return (
    <div className={s.answerBlockWrapper}>
      {field.value.map((item: RightAnswerTaskAnswer, i: number) => (
        <div className={s.answerGroupWrapper} key={item.id}>
          <DeleteIcon fill="#EC2028" onClick={() => onDeleteSkipGroup(item.id)} />
          {item.answers.map((subitem) => (
            <AnswerInput
              groupId={item.id}
              itemId={subitem.id}
              {...subitem}
              itemNumber={i}
              onChange={onChangeAnswer}
              key={subitem.id}
              onDelete={onDeleteWrongAnswer}
            />
          ))}
          {item.answers.length < 5 && (
            <Button
              shape="circle"
              type="default"
              className="redBtn"
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
