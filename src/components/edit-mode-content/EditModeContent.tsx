import { FC } from 'react'
import { Button } from 'antd'
import { useBlocks, useModal } from 'store'
import { CloudSyncIcon } from 'assets'
import { Panel, DragAndDropParagraph, CreateTaskModal } from 'UI'
import { useBubbleState, useBubbleStateManager } from 'provider'
import { ComponentStateType } from 'main'
import s from './EditModeContent.module.scss'

interface EditModeContentProps {
  onViewClick: () => void
}

export const EditModeContent: FC<EditModeContentProps> = (props) => {
  const { onViewClick } = props
  const data = useBlocks((state) => state.data)
  const uploadBlocks = useBlocks((state) => state.uploadBlocks)
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)
  const openPanel = useModal((state) => state.openPanel)

  const state = useBubbleState<ComponentStateType>()
  const stateManager = useBubbleStateManager<ComponentStateType>()

  const uploadBlocksRequest = async () => {
    const versionId = await uploadBlocks(state.apiKey, state.versionId)
    if (versionId) {
      stateManager.updateState({ ...state, versionId })
    }
  }
  return (
    <>
      <div className={s.buttonGroup}>
        <Button type="default" shape="circle" className={`${['greenBtn', s.iconBtn].join(' ')}`}>
          <CloudSyncIcon fill="#fff" />
        </Button>
        <Button type="default" className="blueBtn" shape="round" onClick={onViewClick}>
          Попередній перегляд
        </Button>
        <Button type="primary" shape="round" onClick={uploadBlocksRequest}>
          Опублікувати
        </Button>
      </div>
      <div className={s.wrapper}>
        <div className={s.paragraphWrapper}>
          {data.chapters
            .find((item) => item.id === selectedChapterID)
            ?.blocks.map((item, index) => (
              <DragAndDropParagraph key={item.id} index={index} {...item} />
            ))}
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
    </>
  )
}
