import { FC } from 'react'
import { useField } from 'formik'
import { CategorizeTaskGroup } from 'types'
import { DeleteIcon } from 'assets'
import { Input } from '../../Input'
import s from '../CategorizeBlock.module.scss'

interface CategorizeItemProps {
  id: string
  onDeleteGroup: (id: string) => void
  groupName: string
}

export const CategorizeItem: FC<CategorizeItemProps> = (props) => {
  const { id, onDeleteGroup, groupName } = props

  const [fieldBlock] = useField(groupName)
  const index: number =
    fieldBlock.value.findIndex((item: CategorizeTaskGroup) => item.id === id) || 0
  const mainWordName = `${groupName}[${index}].mainWord`
  const otherWordsName = `${groupName}[${index}].otherWords`

  return (
    <div className={s.categorizeItemWrapper}>
      <DeleteIcon fill="#EC2028" onClick={() => onDeleteGroup(id)} />
      <Input placeholder="Введіть слово" name={mainWordName} />
    </div>
  )
}
