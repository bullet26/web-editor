import { CSSProperties, FC, useEffect } from 'react'
import { Divider } from 'antd'
import { useField } from 'formik'
import { TaskTextWithoutAnswer } from 'types'
import { useFormContext } from '../utils'
import { Input } from './Input'

interface InputForDifTabsProps {
  style: CSSProperties
}

const emptyMidAndHardTab = [
  {
    difficultyLevel: 'middle',
    taskQuestion: '',
  },
  {
    difficultyLevel: 'hard',
    taskQuestion: '',
  },
]

export const InputForDifTabs: FC<InputForDifTabsProps> = (props) => {
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
      (item: TaskTextWithoutAnswer) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const inputName = `taskText[${index}].taskQuestion`

  return (
    <div style={style}>
      <Divider />
      <Input name={inputName} placeholder="Введіть речення" />
      <Divider />
    </div>
  )
}
