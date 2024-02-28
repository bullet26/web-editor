import { FC } from 'react'
import { Button } from 'antd'
import { useField } from 'formik'
import { generateId } from 'utils/index'
import { CategorizeTaskGroup, OtherWordItem } from 'types'
import { DeleteIcon } from 'assets'
import { Input } from '../../Input'
import s from '../CategorizeBlock.module.scss'

interface CategorizeItemProps {
  id: string
  onDeleteGroup: (id: string) => void
  groupName: string
  groupNumber: number
}

export const CategorizeItem: FC<CategorizeItemProps> = (props) => {
  const { id, onDeleteGroup, groupName, groupNumber } = props

  const [fieldBlock] = useField(groupName)
  const index: number =
    fieldBlock.value.findIndex((item: CategorizeTaskGroup) => item.id === id) || 0
  const mainWordName = `${groupName}[${index}].mainWord`
  const otherWordsName = `${groupName}[${index}].otherWords`
  const [fieldOtherWords, , helpersOtherWords] = useField(otherWordsName)

  const onDeleteItemInGroup = (_id: string) => {
    helpersOtherWords.setValue(
      fieldOtherWords.value.filter((item: OtherWordItem) => item.id !== _id),
    )
  }

  const onAddItemInGroup = () => {
    helpersOtherWords.setValue([...fieldOtherWords.value, { id: generateId(), word: '' }])
  }

  return (
    <div className={s.categorizeItemWrapper}>
      <div className={s.inputTitleWrapper}>
        <div className={s.inputTitle}>Група №{groupNumber}</div>
        <DeleteIcon fill="#EC2028" onClick={() => onDeleteGroup(id)} />
      </div>
      <Input placeholder="Введіть слово" name={mainWordName} className={s.mainInput} />
      {fieldOtherWords.value.map((item: OtherWordItem, i: number) => (
        <div key={item.id}>
          <div className={s.inputTitleWrapper}>
            <div className={s.inputTitle}>№{groupNumber}</div>
            <DeleteIcon fill="#EC2028" onClick={() => onDeleteItemInGroup(item.id)} />
          </div>
          <Input placeholder="Введіть слово" name={`${otherWordsName}[${i}].word`} />
        </div>
      ))}
      {fieldOtherWords.value.length < 10 && (
        <Button type="default" className={s.addItemBtn} onClick={onAddItemInGroup}>
          Додати елемент +
        </Button>
      )}
    </div>
  )
}
