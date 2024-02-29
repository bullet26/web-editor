import { FC } from 'react'
import { DeleteIcon } from 'assets'
import { Input } from '../../_elements/Input'
import s from '../Dialogue.module.scss'

interface DialogueItemProps {
  orderNumber: number
  id: string
  onDeleteSentence: (id: string) => void
  sentencesGroupName: string
}

export const DialogueItem: FC<DialogueItemProps> = (props) => {
  const { orderNumber, onDeleteSentence, sentencesGroupName, id } = props

  return (
    <div className={s.itemWrapper}>
      <div className="circle">{orderNumber}</div>
      <Input
        placeholder="Введіть речення"
        name={`${sentencesGroupName}[${orderNumber - 1}].sentence`}
      />
      <DeleteIcon fill="#EC2028" onClick={() => onDeleteSentence(id)} />
    </div>
  )
}
