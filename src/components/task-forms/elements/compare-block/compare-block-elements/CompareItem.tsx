import { FC } from 'react'
import { useField } from 'formik'
import { ArrowIcon, DeleteIcon } from 'assets'
import { CompareTaskWordPair } from 'types'
import { Input } from '../../Input'
import s from '../CompareBlock.module.scss'

interface CompareItemProps {
  id: string
  onDeleteCompareGroup: (id: string) => void
  wordPairsName: string
}

export const CompareItem: FC<CompareItemProps> = (props) => {
  const { id, onDeleteCompareGroup, wordPairsName } = props

  const [fieldBlock] = useField(wordPairsName)
  const index: number =
    fieldBlock.value.findIndex((item: CompareTaskWordPair) => item.id === id) || 0
  const leftName = `${wordPairsName}[${index}].left`
  const rightName = `${wordPairsName}[${index}].right`

  return (
    <div className={s.compareItemWrapper}>
      <DeleteIcon fill="#EC2028" onClick={() => onDeleteCompareGroup(id)} />
      <Input placeholder="Введіть слово" name={leftName} />
      <ArrowIcon />
      <Input placeholder="Введіть слово" name={rightName} />
    </div>
  )
}
