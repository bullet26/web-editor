import { FC } from 'react'
import { Button } from 'antd'
import { useBlocks, useModal } from 'store'
import { Panel, DragAndDropParagraph, CreateTaskModal } from 'UI'
import s from './EditModeContent.module.scss'

interface EditModeContentProps {
  onViewClick: () => void
}

export const EditModeContent: FC<EditModeContentProps> = (props) => {
  const { onViewClick } = props
  const data = useBlocks((state) => state.data)
  const openPanel = useModal((state) => state.openPanel)

  return (
    <>
      <div className={s.buttonGroup}>
        <Button type="default" className="blueBtn" shape="round" onClick={onViewClick}>
          Попередній перегляд
        </Button>
        <Button type="primary" shape="round">
          Опублікувати
        </Button>
      </div>
      <div className={s.wrapper}>
        <div className={s.paragraphWrapper}>
          {data.map(({ type, text, url, id, tableColumns, taskData, imageCaption }, index) => (
            <DragAndDropParagraph
              key={id}
              id={id}
              type={type}
              text={text}
              url={url}
              imageCaption={imageCaption}
              tableColumns={tableColumns}
              taskData={taskData}
              index={index}
            />
          ))}
        </div>
        <Button
          className={s.addBlockBtn}
          style={{ height: data.length ? 'auto' : '80vh' }}
          onClick={openPanel}>
          + Додати блок
        </Button>
      </div>
      <Panel />
      <CreateTaskModal />
    </>
  )
}
