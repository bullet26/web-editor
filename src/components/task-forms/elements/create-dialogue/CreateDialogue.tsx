import { CSSProperties, FC, useEffect } from 'react'
import { Button, Divider } from 'antd'
import { useField } from 'formik'
import { SortDialogueTaskText, SortDialogueSentence } from 'types'
import { generateId } from 'utils'
import { useFormContext } from '../../utils'
import { emptyMidAndHardTab } from './utils'
import { DialogueItem } from './create-dialogue-elements'
import s from './Dialogue.module.scss'

interface CreateDialogueProps {
  wrapperStyle?: CSSProperties
  editorStyle?: CSSProperties
}

export const CreateDialogue: FC<CreateDialogueProps> = (props) => {
  const { wrapperStyle, editorStyle } = props

  const { difficultyLevel, isOneDifficultyLevel } = useFormContext()

  const [fieldBlock, , helpersBlock] = useField('taskText')

  useEffect(() => {
    if (!isOneDifficultyLevel && fieldBlock.value.length < 3) {
      helpersBlock.setValue([...fieldBlock.value, ...emptyMidAndHardTab], true)
    }
  }, [])

  const index: number =
    fieldBlock.value.findIndex(
      (item: SortDialogueTaskText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const sentencesGroupName = `taskText[${index}].sentences`
  const [field, , helpers] = useField(sentencesGroupName)

  const onClickAddSentence = () => {
    helpers.setValue([...field.value, { id: generateId(), sentence: '' }])
  }
  const onDeleteSentence = (id: string) => {
    helpers.setValue(field.value.filter((item: SortDialogueSentence) => item.id !== id))
  }

  return (
    <div style={wrapperStyle}>
      <div className={s.buttonWrapperRight}>
        <Button
          shape="round"
          type="default"
          style={{ width: '206px' }}
          className="blueBtn"
          disabled={field.value.length > 14}
          onClick={onClickAddSentence}>
          Додати діалог
        </Button>
      </div>
      <div style={editorStyle}>
        <Divider style={{ margin: '16px 0' }} />
        {field.value.map((item: SortDialogueSentence, i: number) => (
          <DialogueItem
            key={item.id}
            id={item.id}
            onDeleteSentence={onDeleteSentence}
            sentencesGroupName={sentencesGroupName}
            orderNumber={i + 1}
          />
        ))}
      </div>
    </div>
  )
}
