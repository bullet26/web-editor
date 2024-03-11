import { FC, ReactNode, useState } from 'react'
import { Button, Input, message, Modal } from 'antd'
import classNames from 'classnames'
import { useBlocks } from 'store'
import { TickIcon, PenEditIcon, CrossIcon, DeleteIcon } from 'assets'
import s from './Chapter.module.scss'

export const ChapterEditMode: FC = () => {
  const data = useBlocks((state) => state.data)
  const addChapter = useBlocks((state) => state.addChapter)
  const updateChapter = useBlocks((state) => state.updateChapter)
  const deleteChapter = useBlocks((state) => state.deleteChapter)
  const setSelectedChapterID = useBlocks((state) => state.setSelectedChapterID)
  const selectedChapterID = useBlocks((state) => state.selectedChapterID)

  const [editingInputValue, setInputValue] = useState('')
  const [editedInputID, setEditedInputID] = useState<null | string>(null)

  const onClickAddChapterBtn = () => {
    if (editedInputID) {
      message.warning('Завершіть редагування попереднього розділа')
    } else {
      const id = addChapter()
      if (id) {
        setInputValue('')
        setEditedInputID(id)
        setSelectedChapterID(id)
      }
    }
  }

  const onClickTick = (id: string) => {
    if (!editingInputValue) {
      return
    }
    updateChapter({ id, title: editingInputValue })
    setEditedInputID(null)
  }

  const onClickCross = (id: string, prevValue: string) => {
    if (!prevValue) {
      deleteChapter(id)
      setEditedInputID(null)
    } else {
      setInputValue(prevValue)
    }
  }

  const onClickPenEdit = (id: string, initialValue: string) => {
    if (editedInputID) {
      message.warning('Завершіть редагування попереднього розділа')
    } else {
      setInputValue(initialValue)
      setEditedInputID(id)
    }
  }

  const modalConfirm = ({
    contentText,
    onOkFunction,
  }: {
    contentText?: string | ReactNode
    onOkFunction: () => void
  }) => {
    Modal.confirm({
      title: 'Видалити розділ',
      content: contentText || (
        <>
          <div>Розділ містить блоки.</div>
          <div>Ви впевнені, що хочете його видалити?</div>
        </>
      ),
      onOk: onOkFunction,
      okText: 'Так',
      cancelText: 'Ні',
    })
  }

  const onClickDelete = (id: string) => {
    const isLastChapter = data.chapters.length === 1
    const isChapterConsistBlocks = !!data.chapters.find((item) => item.id === id)?.blocks.length

    if (!isChapterConsistBlocks && !isLastChapter) {
      deleteChapter(id)
    } else if (isChapterConsistBlocks && !isLastChapter) {
      modalConfirm({ onOkFunction: () => deleteChapter(id) })
    } else if (isLastChapter) {
      modalConfirm({
        contentText: (
          <>
            <div>Це останній розділ в уроці.</div>
            <div>Урок має містити хоча б один розділ.</div>
            <div> Ви впевнені, що хочете його видалити?</div>
          </>
        ),
        onOkFunction: () => {
          deleteChapter(id)
          setSelectedChapterID(null)
        },
      })
    }
  }

  const onClickInput = (id: string) => {
    setSelectedChapterID(id)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.buttonTitleWrapper}>
        <div className={s.title}>Урок №1</div>
        <Button type="primary" shape="round" onClick={onClickAddChapterBtn}>
          + Розділ
        </Button>
      </div>
      {data?.chapters?.map((item) => (
        <div key={item.id} className={s.inputIconsWrapper}>
          <div className={s.inputWrapper} onClick={() => onClickInput(item.id)}>
            {editedInputID === item.id ? (
              <Input
                placeholder="Введіть назву"
                variant="borderless"
                value={editingInputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              <div
                className={classNames(s.input, {
                  [s.favChapter]: selectedChapterID === item.id,
                })}>
                {item.title}
              </div>
            )}
            <div className={s.divider} />
          </div>
          <div className={s.icons}>
            {editedInputID !== item.id && (
              <>
                <PenEditIcon onClick={() => onClickPenEdit(item.id, item.title)} />
                <DeleteIcon
                  fill="#EC2028"
                  onClick={() => {
                    onClickDelete(item.id)
                  }}
                />
              </>
            )}
            {editedInputID === item.id && (
              <>
                <TickIcon
                  fill={editingInputValue ? '#00AC64' : 'lightgrey'}
                  onClick={() => onClickTick(item.id)}
                />
                <CrossIcon
                  onClick={() => {
                    onClickCross(item.id, item.title)
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
