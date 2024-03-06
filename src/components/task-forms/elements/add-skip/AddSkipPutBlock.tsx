import { FC, useRef, MouseEvent, CSSProperties, useEffect } from 'react'
import { Button, Divider } from 'antd'
import { useField } from 'formik'
import { RightAnswerTaskText } from 'types'
import { useFormContext } from '../../utils'
import { AnswerInputBlock, InputFromEditableDiv } from './add-skip-elements'
import { addSkip, emptyMidAndHardTab, deleteSkipCheck } from './utils'
import s from './AddSkip.module.scss'

interface AddSkipPutBlockProps {
  wrapperStyle?: CSSProperties
  editorStyle?: CSSProperties
  skipType: 'rectangle' | 'line'
  onlyCorrectAnswer?: boolean
  onlyOneOrTwoAnswer?: boolean
}

export const AddSkipPutBlock: FC<AddSkipPutBlockProps> = (props) => {
  const {
    wrapperStyle,
    editorStyle,
    skipType,
    onlyCorrectAnswer = false,
    onlyOneOrTwoAnswer = false,
  } = props

  const inputRef = useRef<HTMLElement>(null)
  const { difficultyLevel, isOneDifficultyLevel } = useFormContext()

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
  const [, , helpersQuestion] = useField(inputName)
  const [fieldAnswer, meta, helpersAnswer] = useField(answerBlockName)

  const onClickAddSkip = (event: MouseEvent<HTMLElement>) => {
    const checkQuantIncorrectAnswersInPrevGroup = onlyOneOrTwoAnswer
    const { answerValue, questionValue } = addSkip(
      event,
      inputRef,
      fieldAnswer.value,
      skipType,
      checkQuantIncorrectAnswersInPrevGroup,
    )
    helpersAnswer.setValue(answerValue, true)
    helpersQuestion.setValue(questionValue, true)
  }

  const onKeyPressDeleteSkip = () => {
    const { answerValue, questionValue } = deleteSkipCheck(inputRef, fieldAnswer.value)
    helpersAnswer.setValue(answerValue, true)
    helpersQuestion.setValue(questionValue, true)
  }

  return (
    <div style={wrapperStyle}>
      <div className={s.buttonWrapperRight}>
        <Button
          shape="round"
          type="default"
          style={{ width: '206px' }}
          className="blueBtn"
          disabled={
            onlyOneOrTwoAnswer ? fieldAnswer.value.length > 1 : fieldAnswer.value.length > 14
          }
          onClick={onClickAddSkip}>
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
          onlyCorrectAnswer={onlyCorrectAnswer}
          onlyOneOrTwoAnswer={onlyOneOrTwoAnswer}
        />
      </div>
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}
