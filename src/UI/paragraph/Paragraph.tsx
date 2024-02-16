/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input, Popover, Button } from 'antd'
import { useBlocks } from 'store'
import { RightAnswerTask, Type, DataTypeItem } from 'types'
import { RightAnswerView } from 'components'
import { DraftEditor, DropZone, TableBlocks } from 'UI'
import {
  DeleteIcon,
  CopyIcon,
  MoveIcon,
  MoreOptionsIcon,
  CloudSyncIcon,
  CloudLockIcon,
  CloudIcon,
} from 'assets'
import { getLabel } from 'utils'
import s from './Paragraph.module.scss'

interface ParagraphProps {
  type: Type
  savedInLibrary: boolean
  text?: string
  url?: string
  imageCaption?: string
  taskData?: RightAnswerTask
  tableColumns?: DataTypeItem[]
  id: string
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const addBlock = useBlocks((state) => state.addBlock)
  const deleteBlock = useBlocks((state) => state.deleteBlock)
  const copyBlock = useBlocks((state) => state.copyBlock)
  const saveInLibraryBlock = useBlocks((state) => state.saveInLibraryBlock)
  const unlinkFromLibraryBlock = useBlocks((state) => state.unlinkFromLibraryBlock)

  const {
    text,
    type,
    id,
    url,
    taskData,
    savedInLibrary,
    imageCaption = '',
    tableColumns = [],
  } = props
  const { label, placeholder } = getLabel(type)

  const onChangeDraft = (inputText: string) => {
    addBlock({ type: 'custom', id, text: inputText })
  }

  const onChangeImage = (inputUrl: string, inputImageCaption?: string) => {
    addBlock({ type: 'image', id, url: inputUrl, imageCaption: inputImageCaption })
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.label}>{label}</div>
        <div className={s.icons}>
          {savedInLibrary ? (
            <Popover
              placement="bottomRight"
              title={false}
              className={s.popoverGreyBG}
              content={
                <>
                  <div className={s.popoverTitleWrapper}>
                    <div className={s.popoverTitle}>Бібліотека </div>
                    <CloudSyncIcon fill="#00AC64" />
                  </div>
                  <div className={s.popoverBtnWrapper}>
                    <Button
                      type="default"
                      className="greenBtn"
                      shape="round"
                      style={{ width: '248px' }}>
                      Редагувати в бібліотеці
                    </Button>
                    <Button
                      type="default"
                      className="blueBtn"
                      shape="round"
                      style={{ width: '248px' }}
                      onClick={() => {
                        unlinkFromLibraryBlock(id)
                      }}>
                      Зробити локальну копію
                    </Button>
                  </div>
                </>
              }>
              <CloudLockIcon />
            </Popover>
          ) : (
            <Popover
              placement="bottomRight"
              title={false}
              className={s.popoverGreyBG}
              content={
                <>
                  <div className={s.popoverTitle}>Бібліотека </div>
                  <Button
                    type="default"
                    className="greenBtn"
                    shape="round"
                    style={{ width: '248px' }}
                    onClick={() => {
                      saveInLibraryBlock(id)
                    }}>
                    Додати до бібліотеки
                  </Button>
                </>
              }>
              <CloudIcon />
            </Popover>
          )}
          <MoveIcon />

          <Popover
            placement="bottomRight"
            title={false}
            style={{ padding: 0 }}
            content={
              <div className="dropdownFromPopover">
                <div className={s.popoverItem} onClick={() => copyBlock(id)}>
                  <CopyIcon /> Копіювати
                </div>
                <div className={s.popoverItem} onClick={() => deleteBlock(id)}>
                  <DeleteIcon fill="#000" /> Видалити
                </div>
              </div>
            }>
            <MoreOptionsIcon />
          </Popover>
        </div>
      </div>
      {type === 'image' && (
        <DropZone
          label={label}
          url={url}
          placeholder={placeholder}
          imageCaption={imageCaption}
          onChange={onChangeImage}
        />
      )}
      {type === 'custom' && (
        <DraftEditor defaultValue={text} placeholder={placeholder} onChange={onChangeDraft} />
      )}
      {(type === 'title' || type === 'note') && (
        <Input
          placeholder={placeholder}
          value={text}
          className={s[type]}
          onChange={(event) => addBlock({ type, id, text: event.target.value })}
        />
      )}
      {type === 'table' && <TableBlocks tableColumnQuant={2} data={tableColumns} id={id} />}
      {type === 'rightAnswerTask' && <RightAnswerView data={taskData} id={id} mode="edit" />}
    </>
  )
}
