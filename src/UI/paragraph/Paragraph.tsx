/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input } from 'antd'
import { RightAnswerTask, Type, DataTypeItem } from 'types'
import { RightAnswerView } from 'components'
import { DraftEditor, DropZone, TableBlocks } from 'UI'
import { DeleteIcon, CopyIcon, MoveIcon } from 'assets'
import { useMyContext } from 'provider'
import { getLabel } from 'utils'
import s from './Paragraph.module.scss'

interface ParagraphProps {
  type: Type
  text?: string
  url?: string
  imageCaption?: string
  taskData?: RightAnswerTask
  tableColumns?: DataTypeItem[]
  id: string
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { deleteBlock, addBlock, copyBlock } = useMyContext()

  const { text, type, id, url, taskData, imageCaption = '', tableColumns = [] } = props
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
          <MoveIcon />
          <CopyIcon onClick={() => copyBlock(id)} />
          <DeleteIcon onClick={() => deleteBlock(id)} fill="#EC2028" />
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
      {(type === 'title' || type === 'subtitle' || type === 'note') && (
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
