import { FC } from 'react'
import { Card } from 'antd'
import { useChosenTask, useModal } from 'store'
import { types, Type } from 'types'
import { rightAnswerBlockIcon } from 'assets'
import s from './TemplatesTab.module.scss'

export const TasksTab: FC = () => {
  const setChosenTaskID = useChosenTask((state) => state.setChosenTaskID)
  const setChosenTaskType = useChosenTask((state) => state.setChosenTaskType)
  const openModal = useModal((state) => state.openModal)
  const closePanel = useModal((state) => state.closePanel)

  const clickCard = (taskType: Type) => {
    if (!types.includes(taskType)) {
      console.log('clickCard', 'unlnown type', taskType)
    }
    closePanel()
    setChosenTaskType(taskType)
    setChosenTaskID(null)
    openModal()
  }
  return (
    <div className={s.tabItemWrapper}>
      <Card
        title="Правильна відповідь"
        className={s.card}
        onClick={() => {
          clickCard('rightAnswerTask')
        }}>
        <div className={s.cardBody}>
          <img src={rightAnswerBlockIcon} alt="rightAnswerBlockIcon" />
        </div>
      </Card>
    </div>
  )
}
