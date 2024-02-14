import { FC, useRef, MouseEvent, KeyboardEvent, CSSProperties, useEffect } from 'react'
import { Button, Divider } from 'antd'
import { useField } from 'formik'
import { useChosenTask } from 'store'
import { RightAnswerTaskText } from 'types'
import { AnswerInputBlock, InputFromEditableDiv } from './add-skip-elements'
import { addSkip, emptyMidAndHardTab, deleteSkipCheck } from './utils'
import s from '../RAElements.module.scss'

interface RightAnswerPutBlockProps {
  wrapperStyle?: CSSProperties
  editorStyle?: CSSProperties
}

export const RightAnswerPutBlock: FC<RightAnswerPutBlockProps> = (props) => {
  const { wrapperStyle, editorStyle } = props

  const inputRef = useRef<HTMLElement>(null)
  const difficultyLevel = useChosenTask((state) => state.difficultyLevel)
  const isOneDifficultyLevel = useChosenTask((state) => state.isOneDifficultyLevel)

  const [fieldBlock, , helpersBlock] = useField('taskText')

  useEffect(() => {
    if (!isOneDifficultyLevel && fieldBlock.value.length < 3) {
      helpersBlock.setValue([...fieldBlock.value, ...emptyMidAndHardTab], true)
    }
  }, [])

  const index: number =
    fieldBlock.value.findIndex(
      (item: RightAnswerTaskText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const inputName = `taskText[${index}].taskQuestion`
  const answerBlockName = `taskText[${index}].taskAnswers`
  const [field, meta, helpers] = useField(answerBlockName)

  const onClickAddSkip = (event: MouseEvent<HTMLElement>) => {
    const fieldValues = addSkip(event, inputRef, field.value)
    helpers.setValue(fieldValues, true)
  }

  const onKeyPressDeleteSkip = () => {
    const answerBlockNewValue = deleteSkipCheck(inputRef, field.value)

    if (answerBlockNewValue) {
      helpers.setValue(answerBlockNewValue, true)
    }
  }

  return (
    <div style={wrapperStyle}>
      <div className={s.buttonWrapperRight}>
        <Button shape="round" type="default" className="blueBtn" onClick={onClickAddSkip}>
          Додати пропуск
        </Button>
      </div>
      <div style={editorStyle}>
        <Divider style={{ margin: '16px 0' }} />
        <InputFromEditableDiv
          placeholder="Введіть текст"
          additionalOnChangeFunc={onKeyPressDeleteSkip}
          name={inputName}
          innerRef={inputRef}
          style={{ margin: '16px 0' }}
        />
        <div className={s.blockTitle}>Варіанти відповідей</div>
        <AnswerInputBlock
          inputName={inputName}
          answerBlockName={answerBlockName}
          inputRef={inputRef}
        />
      </div>
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}
