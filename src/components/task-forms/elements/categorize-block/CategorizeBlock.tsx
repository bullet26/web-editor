import { FC, CSSProperties, useEffect } from 'react'
import { useField } from 'formik'
import { Button, Divider } from 'antd'
import { generateId } from 'utils'
import { CategorizeTaskText, CategorizeTaskGroup } from 'types'
import { useFormContext } from '../../utils'
import { emptyMidAndHardTab } from './utils'
import { CategorizeItem } from './categorize-block-elements'
import s from './CategorizeBlock.module.scss'

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

  const onAddGroup = () => {
    helpers.setValue([
      ...field.value,
      { id: generateId(), mainWord: '', otherWords: [{ id: generateId(), word: '' }] },
    ])
  }

  const onDeleteGroup = (id: string) => {
    helpers.setValue(field.value.filter((item: CategorizeTaskGroup) => item.id !== id))
  }

  return (
    <div style={wrapperStyle}>
      <Divider style={{ margin: '16px 0' }} />
      <div className={s.categoryGroupWrapper}>
        {field.value.map((item: CategorizeTaskGroup, i: number) => (
          <CategorizeItem
            key={item.id}
            id={item.id}
            groupNumber={i + 1}
            groupName={groupName}
            onDeleteGroup={onDeleteGroup}
          />
        ))}
        {field.value.length < 4 && (
          <Button
            shape="circle"
            type="default"
            className="blueBtn"
            style={{ width: '32px', marginTop: '39px' }}
            onClick={onAddGroup}>
            +
          </Button>
        )}
      </div>
    </div>
  )
}
