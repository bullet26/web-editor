import { FC } from 'react'
import { Button } from 'antd'
import { useBlocks, useModal } from 'store'
import { CloudSyncIcon } from 'assets'
import { Panel, DragAndDropParagraph, CreateTaskModal } from 'UI'
import s from './EditModeContent.module.scss'

interface EditModeContentProps {
  onViewClick: () => void
}

export const EditModeContent: FC<EditModeContentProps> = (props) => {
  const { onViewClick } = props
  const data = useBlocks((state) => state.data)
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)
  const openPanel = useModal((state) => state.openPanel)

  return (
    <div style={{ flex: 1 }}>
      <div className={s.buttonGroup}>
        <Button type="default" shape="circle" className={`${['greenBtn', s.iconBtn].join(' ')}`}>
          <CloudSyncIcon fill="#fff" />
        </Button>
        <Button type="default" className="blueBtn" shape="round" onClick={onViewClick}>
          Попередній перегляд
        </Button>
        <Button type="primary" shape="round">
          Опублікувати
        </Button>
      </div>
      <div className={s.wrapper}>
        <div className={s.paragraphWrapper}>
          {data.chapters
            .find((item) => item.id === selectedChapterID)
            ?.blocks.map(
              (
                { type, text, url, id, tableColumns, taskData, imageCaption, savedInLibrary },
                index,
              ) => (
                <DragAndDropParagraph
                  key={id}
                  id={id}
                  type={type}
                  savedInLibrary={savedInLibrary}
                  text={text}
                  url={url}
                  imageCaption={imageCaption}
                  tableColumns={tableColumns}
                  taskData={taskData}
                  index={index}
                />
              ),
            )}
        </div>
        <Button
          className={s.addBlockBtn}
          style={{
            height: data.chapters.find((item) => item.id === selectedChapterID)?.blocks.length
              ? 'auto'
              : '80vh',
          }}
          onClick={openPanel}>
          + Додати блок
        </Button>
      </div>
      <Panel />
      <CreateTaskModal />
    </div>
  )
}
