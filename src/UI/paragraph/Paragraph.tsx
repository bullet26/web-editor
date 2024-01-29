/* eslint-disable import/no-extraneous-dependencies */
import { FC, useRef } from 'react'
import { Input } from 'antd'
import { useDrag, useDrop } from 'react-dnd'
import { RightAnswerTask, Type } from 'types'
import { RightAnswerView } from 'components'
import { DraftEditor, DropZone } from 'UI'
import { DeleteIcon, CopyIcon, MoveIcon } from 'assets'
import { useMyContext } from 'provider'
import { getLabel } from 'utils'
import s from './Paragraph.module.scss'

interface ParagraphProps {
  type: Type
  text?: string
  url?: string
  theme?: string
  taskData?: RightAnswerTask
  id: string
  index: number
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { deleteBlock, addBlock, copyBlock, moveBlock } = useMyContext()
  const ref = useRef(null)
  const dragType = 'PARAGRAPH'

  const { text, type, id, url, theme, taskData, index } = props
  const { label, placeholder } = getLabel(type)

  const onChangeDraft = (inputText: string) => {
    addBlock({ type: 'custom', id, text: inputText })
  }

  const onChangeImage = (inputUrl: string) => {
    addBlock({ type: 'image', id, url: inputUrl })
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: dragType,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: { id: string; index: number }) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const dropIndex = index

      if (dragIndex === dropIndex) {
        return
      }

      moveBlock(dragIndex, dropIndex)
    },
  }))

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragType,
    item: { id, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  drag(drop(ref)) //  Initialize drag and drop into the element

  const isActiveDrop = canDrop && isOver

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isActiveDrop ? '5px solid green' : '5px solid transparent',
      }}
      ref={ref}>
      <div className={s.wrapper}>
        <div className={s.label}>{label}</div>
        <div className={s.icons}>
          <MoveIcon />
          <CopyIcon onClick={() => copyBlock(id)} />
          <DeleteIcon onClick={() => deleteBlock(id)} fill="#EC2028" />
        </div>
      </div>
      {type === 'image' && (
        <DropZone label={label} url={url} placeholder={placeholder} onChange={onChangeImage} />
      )}
      {type === 'custom' && (
        <DraftEditor
          editorClassName={s.paragraph}
          defaultValue={text}
          placeholder={placeholder}
          onChange={onChangeDraft}
        />
      )}
      {type === 'text' && (
        <>
          <Input
            placeholder={placeholder.split('|').at(0)}
            value={theme}
            className={s[type]}
            onChange={(event) => addBlock({ type, id, theme: event.target.value })}
          />
          <Input
            placeholder={placeholder.split('|').at(1)}
            value={text}
            className={s[type]}
            onChange={(event) => addBlock({ type, id, text: event.target.value })}
            style={{ marginTop: '8px' }}
          />
        </>
      )}

      {(type === 'title' || type === 'subtitle' || type === 'note') && (
        <Input
          placeholder={placeholder}
          value={text}
          className={s[type]}
          onChange={(event) => addBlock({ type, id, text: event.target.value })}
        />
      )}
      {type === 'rightAnswerTask' && <RightAnswerView data={taskData} id={id} mode="edit" />}
    </div>
  )
}
