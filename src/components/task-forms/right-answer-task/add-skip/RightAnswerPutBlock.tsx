import { FC, MouseEvent, useRef } from 'react'
import { Button } from 'antd'
import { useField } from 'formik'
import { RightAnswerTaskAnswer } from 'types'
import { generateId, generateRandomColor } from 'utils'
import { Input } from '../../elements'
import { InputFromEditableDiv } from './InputFromEditableDiv'
import { AnswerInput } from './AnswerInput'
import { moveCursorToEnd, getCursorPosition, sortAnswers } from './utils'
import s from '../RAElements.module.scss'

export const RightAnswerPutBlock: FC = () => {
  const inputName = 'taskText'
  const answerBlockName = 'taskAnswers'

  const inputRef = useRef<HTMLElement>(null)
  const [field, meta, helpers] = useField(answerBlockName)
  const [fieldTaskText, , helpersTaskText] = useField(inputName)

  const addSkip = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault() // fix for move cursor in the end

    const id = generateId()
    const color = generateRandomColor()

    const skipItem = `<span contentEditable=false class="skip" style="border-bottom-color: ${color}" data-skip="${id}"></span>&nbsp;`

    if (!inputRef.current) {
      return
    }

    inputRef.current.focus()
    if (!getCursorPosition(inputRef)) {
      moveCursorToEnd(inputRef)
    }

    document.execCommand('insertHTML', false, skipItem)

    const prevStateFieldValue = field.value
    const currentValue: RightAnswerTaskAnswer = {
      type: 'correct',
      id,
      value: '',
      color,
    }

    const fieldValues = sortAnswers(inputRef, [...prevStateFieldValue, currentValue])

    helpers.setValue(fieldValues, true)
  }

  const addWrongAnswer = () => {
    const prevStateFieldValue = field.value
    const currentValue: RightAnswerTaskAnswer = {
      type: 'incorrect',
      id: generateId(),
      value: '',
    }

    helpers.setValue([...prevStateFieldValue, currentValue], true)
  }

  const onChangeAnswer = (id: string, value: string) => {
    const fieldValueS = field.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === id) {
        return { ...item, value }
      }
      return item
    })

    helpers.setValue(fieldValueS, true)
  }

  const onDeleteSkipAndAnswer = (type: 'correct' | 'incorrect', id: string) => {
    if (type === 'correct' && inputRef.current) {
      const regex = new RegExp(`<span[^>]*data-skip="${id}"[^>]*><\/span>`, 'g')
      const prevStateFieldValue = fieldTaskText.value

      helpersTaskText.setValue(prevStateFieldValue.replace(regex, ''), true)
    }

    const fieldValueS = field.value.filter((item: RightAnswerTaskAnswer) => item.id !== id)
    helpers.setValue(fieldValueS, true)
  }

  return (
    <>
      <div className={s.inputTabWrapper}>
        <div className={s.inputWrapper}>
          <Input placeholder="Введіть підзаголовок" name="subtitle" />
        </div>
        <Button shape="round" type="default" className="blueBtn" onClick={addSkip}>
          Додати пропуск
        </Button>
      </div>
      <InputFromEditableDiv
        placeholder="Введіть текст"
        name={inputName}
        innerRef={inputRef}
        style={{ margin: '16px 0' }}
      />
      <div className={s.inputTabWrapper}>
        <div className={s.blockTitle}>Варіанти відповідей</div>
        <Button shape="round" type="default" className="redBtn" onClick={addWrongAnswer}>
          + Слово
        </Button>
      </div>
      <div className={s.answerBlockWrapper}>
        {field.value.map((item: RightAnswerTaskAnswer, i: number) => (
          <AnswerInput
            {...item}
            itemNumber={i}
            onChange={onChangeAnswer}
            key={item.id}
            onDelete={onDeleteSkipAndAnswer}
          />
        ))}
      </div>
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </>
  )
}
