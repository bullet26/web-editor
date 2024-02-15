import { FC } from 'react'
import { Card } from 'antd'
import { useBlocks, useChosenTask, useModal } from 'store'
import { types, Type } from 'types'
import s from './TemplatesTab.module.scss'

export const ServiceTab: FC = () => {
  const addBlock = useBlocks((state) => state.addBlock)
  const setChosenTaskID = useChosenTask((state) => state.setChosenTaskID)
  const setChosenTaskType = useChosenTask((state) => state.setChosenTaskType)
  const closePanel = useModal((state) => state.closePanel)

  const clickCard = (taskType: Type) => {
    if (!types.includes(taskType)) {
      console.log('clickCard', 'unknown type', taskType)
    }
    closePanel()
    setChosenTaskType(taskType)
    setChosenTaskID(null)

    const type = taskType as Type
    addBlock({ type, id: '' })
  }

  return (
    <div className={s.tabItemWrapper}>
      <Card
        title="Примітки для викладача"
        className={s.card}
        onClick={() => {
          clickCard('note')
        }}>
        <div className={s.input}>Введіть текст</div>
      </Card>
    </div>
  )
}
