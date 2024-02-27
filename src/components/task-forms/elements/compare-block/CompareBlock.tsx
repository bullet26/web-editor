import { FC, CSSProperties, useEffect } from 'react'
import { Button, Divider } from 'antd'
import { useField } from 'formik'
import { CompareTaskText, CompareTaskWordPair } from 'types'
import { generateId } from 'utils'
import { useFormContext } from '../../utils'
import { emptyMidAndHardTab } from './utils'
import { CompareItem } from './compare-block-elements'
import s from './CompareBlock.module.scss'

interface CompareBlockProps {
  wrapperStyle?: CSSProperties
  editorStyle?: CSSProperties
}

export const CompareBlock: FC<CompareBlockProps> = (props) => {
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
      (item: CompareTaskText) => item.difficultyLevel === difficultyLevel,
    ) || 0

  const wordPairsName = `taskText[${index}].wordPairs`
  const [field, , helpers] = useField(wordPairsName)

  const onClickAddCompareGroup = () => {
    helpers.setValue([...field.value, { id: generateId(), left: '', right: '' }])
  }
  const onDeleteCompareGroup = (id: string) => {
    helpers.setValue(field.value.filter((item: CompareTaskWordPair) => item.id !== id))
  }

  return (
    <div style={wrapperStyle}>
      <div className={s.buttonWrapperRight}>
        <Button
          shape="round"
          type="default"
          disabled={field.value?.length === 10}
          style={{ width: '206px' }}
          className="blueBtn"
          onClick={onClickAddCompareGroup}>
          Додати групу
        </Button>
      </div>
      <div style={editorStyle}>
        <Divider style={{ margin: '16px 0' }} />
        {field.value.map((item: CompareTaskWordPair) => (
          <CompareItem
            key={item.id}
            id={item.id}
            onDeleteCompareGroup={onDeleteCompareGroup}
            wordPairsName={wordPairsName}
          />
        ))}
      </div>
    </div>
  )
}
