import { FC } from 'react'
import { SortDialogueTask } from 'types'
import { HandMoveIcon } from 'assets'
import s from './SortDialogueTaskView.module.scss'

interface SortDialogueTaskViewProps {
  data: SortDialogueTask | null
}

export const SortDialogueTaskView: FC<SortDialogueTaskViewProps> = (props) => {
  const { data } = props

  return (
    <div className={s.wrapper}>
      {data?.taskText[0].sentences.map((item) => (
        <div className={s.dialogueItem} key={item.id}>
          <span className={s.text}>- {item.sentence}</span>
          <HandMoveIcon />
        </div>
      ))}
    </div>
  )
}
