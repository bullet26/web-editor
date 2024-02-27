import { FC, CSSProperties, useEffect } from 'react'
import { useField } from 'formik'
import { Button } from 'antd'
import { generateId } from 'utils'
import { CategorizeTaskText, CategorizeTaskGroup } from 'types'
import { useFormContext } from '../../utils'
import { emptyMidAndHardTab } from './utils'
import { CategorizeItem } from './categorize-block-elements'

interface CategorizeBlockProps {
  wrapperStyle?: CSSProperties
}

export const CategorizeBlock: FC<CategorizeBlockProps> = (props) => {
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
      (item: CategorizeTaskText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const groupName = `taskText[${index}].groups`
  const [field, , helpers] = useField(groupName)

  const onAddGroup = () => {}

  const onDeleteGroup = (id: string) => {}

  return (
    <div style={wrapperStyle}>
      {field.value.map((item: CategorizeTaskGroup) => (
        <CategorizeItem
          key={item.id}
          id={item.id}
          groupName={groupName}
          onDeleteGroup={onDeleteGroup}
        />
      ))}
      {field.value.length < 5 && (
        <Button
          shape="circle"
          type="default"
          className="blueBtn"
          style={{ width: '32px' }}
          onClick={onAddGroup}>
          +
        </Button>
      )}
    </div>
  )
}
