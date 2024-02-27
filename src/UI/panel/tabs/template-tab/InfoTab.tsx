import { FC } from 'react'
import { Card } from 'antd'
import { useBlocks, useChosenTask, useModal } from 'store'
import { types, Type } from 'types'
import { generateId } from 'utils'
import { editorBlockIcon, imageBlockIcon } from 'assets'
import s from './TemplatesTab.module.scss'

export const InfoTab: FC = () => {
  const addBlock = useBlocks((state) => state.addBlock)
  const setChosenTaskID = useChosenTask((state) => state.setChosenTaskID)
  const setChosenTaskType = useChosenTask((state) => state.setChosenTaskType)
  const closePanel = useModal((state) => state.closePanel)

  const clickCard = (taskType: Type) => {
    if (!types.includes(taskType)) {
      console.log('clickCard', 'unlnown type', taskType)
    }
    closePanel()
    setChosenTaskType(taskType)
    setChosenTaskID(null)

    if (taskType === 'table') {
      const type = taskType as Type
      addBlock({
        type,
        id: '',
        tableColumns: [
          {
            type: 'custom',
            id: generateId(),
            text: '',
          },
          {
            type: 'image',
            id: generateId(),
            url: '',
          },
        ],
      })
    } else {
      const type = taskType as Type
      addBlock({ type, id: '' })
    }
  }

  return (
    <div className={s.tabItemWrapper}>
      <Card
        title="Заголовок"
        className={s.card}
        onClick={() => {
          clickCard('title')
        }}>
        <div className={s.cardBody}>
          <div className={s.input}>Введіть заголовок</div>
        </div>
      </Card>
      <Card
        title="Загальний блок"
        className={s.card}
        onClick={() => {
          clickCard('custom')
        }}>
        <div className={s.cardBody}>
          <img src={editorBlockIcon} alt="editorBlockIcon" />
        </div>
      </Card>
      <Card
        title="Два блоки"
        className={s.card}
        onClick={() => {
          clickCard('table')
        }}>
        <div className={s.cardBodyTwoElem}>
          <img src={editorBlockIcon} alt="editorBlockIcon" />
          <img src={imageBlockIcon} alt="imageBlockIcon" />
        </div>
      </Card>
      <Card
        title="Зображення"
        className={s.card}
        onClick={() => {
          clickCard('image')
        }}>
        <div className={s.cardBody}>
          <img src={imageBlockIcon} alt="imageBlockIcon" />
        </div>
      </Card>
    </div>
  )
}
