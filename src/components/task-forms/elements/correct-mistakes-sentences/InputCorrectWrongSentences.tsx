import { CSSProperties, FC, useEffect } from 'react'
import { Divider } from 'antd'
import { useField } from 'formik'
import { CorrectMistakesText } from 'types'
import { useFormContext } from '../../utils'
import { Input } from '../_elements'
import s from './CorrectWrongSentences.module.scss'

interface InputForDifTabsProps {
  style: CSSProperties
}

const emptyMidAndHardTab = [
  {
    difficultyLevel: 'middle',
    correctSentence: '',
    wrongSentence: '',
  },
  {
    difficultyLevel: 'hard',
    correctSentence: '',
    wrongSentence: '',
  },
]

export const InputCorrectWrongSentences: FC<InputForDifTabsProps> = (props) => {
  const { style } = props
  const { difficultyLevel, isOneDifficultyLevel } = useFormContext()

  const [fieldBlock, , helpersBlock] = useField('taskText')

  useEffect(() => {
    if (!isOneDifficultyLevel && fieldBlock.value.length < 3) {
      helpersBlock.setValue([...fieldBlock.value, ...emptyMidAndHardTab], true)
    }
  }, [])

  const index: number =
    fieldBlock.value.findIndex(
      (item: CorrectMistakesText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const inputCorrectSentenceName = `taskText[${index}].correctSentence`
  const inputWrongSentenceName = `taskText[${index}].wrongSentence`

  return (
    <div style={style}>
      <Divider style={{ margin: '16px 0' }} />
      <Input
        name={inputWrongSentenceName}
        placeholder="Введіть речення з помилками"
        type="textarea"
        autoSize
      />
      <Divider style={{ margin: '16px 0' }} />
      <div className={s.inputTitle}>Правильна відповідь</div>
      <Input
        name={inputCorrectSentenceName}
        placeholder="Введіть виправлене речення"
        type="textarea"
        autoSize
      />
      <Divider />
    </div>
  )
}
