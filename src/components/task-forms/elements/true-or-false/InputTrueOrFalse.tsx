/* eslint-disable react/jsx-boolean-value */
import { FC, CSSProperties, useEffect } from 'react'
import { Divider, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { useField } from 'formik'
import { TrueOrFalseTaskText } from 'types'
import { useFormContext } from '../../utils'
import { emptyMidAndHardTab } from './utils'
import s from './InputTrueOrFalse.module.scss'
import { Input } from '../_elements'

interface InputTrueOrFalseProps {
  wrapperStyle?: CSSProperties
}

export const InputTrueOrFalse: FC<InputTrueOrFalseProps> = (props) => {
  const { wrapperStyle } = props
  const { difficultyLevel, isOneDifficultyLevel } = useFormContext()
  const [fieldBlock, , helpersBlock] = useField('taskText')

  useEffect(() => {
    if (!isOneDifficultyLevel && fieldBlock.value.length < 3) {
      helpersBlock.setValue([...fieldBlock.value, ...emptyMidAndHardTab], true)
    }
  }, [])

  const index: number =
    fieldBlock.value.findIndex(
      (item: TrueOrFalseTaskText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const taskItemDataName = `taskText[${index}].taskItemData`
  const taskQuestionName = `${taskItemDataName}.question`
  const [fieldFormat, , helpersFormat] = useField(`${taskItemDataName}.format`)
  const [fieldAnswerValue, , helpersAnswerValue] = useField(`${taskItemDataName}.answer`)

  const onChangeFormat = (e: RadioChangeEvent) => {
    helpersFormat.setValue(e.target.value)
  }

  const onChangeAnswerValue = (e: RadioChangeEvent) => {
    helpersAnswerValue.setValue(e.target.value)
  }

  return (
    <div style={wrapperStyle}>
      <Divider />
      <Input name={taskQuestionName} type="textarea" autoSize />
      <div className={s.radioGroupWrapper}>
        <div>
          <div className={s.radioGroupTitle}>Правильна відповідь</div>
          <Radio.Group onChange={onChangeAnswerValue} value={fieldAnswerValue.value}>
            <Radio value={true}>{fieldFormat.value === 'trueOrFalse' ? 'Правда' : 'Так'}</Radio>
            <Radio value={false}>{fieldFormat.value === 'trueOrFalse' ? 'Неправда' : 'Ні'}</Radio>
          </Radio.Group>
        </div>
        <div>
          <div className={s.radioGroupTitle}>Формати відповідей</div>
          <Radio.Group onChange={onChangeFormat} value={fieldFormat.value}>
            <Radio value="yesOrNo">Так/Ні</Radio>
            <Radio value="trueOrFalse">Правда/Неправда</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}
