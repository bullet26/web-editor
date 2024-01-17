import { FC } from 'react'
import { Input } from 'antd'
import { Type } from 'types'
import { DeleteIcon } from 'assets'
import { DraftEditor, DropZone } from 'UI'
import s from './Paragraph.module.scss'

interface ParagraphProps {
  label: string
  type: Type
  text?: string
  placeholder?: string
  url?: string
  id: string
  onDelete: (id: string) => void
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { label, text, type, placeholder, onDelete, id, url } = props

  return type === 'image' ? (
    <div className={s.wrapper}>
      <DropZone label={label} url={url} />
      <div className={s.icons}>
        <DeleteIcon onClick={() => onDelete(id)} />
      </div>
    </div>
  ) : (
    <div>
      <div className={s.label}>{label}</div>
      <div className={s.wrapper}>
        {type === 'text' ? (
          <DraftEditor
            editorClassName={s.paragraph}
            defaultValue={text}
            placeholder={placeholder}
          />
        ) : (
          <Input placeholder={placeholder} value={text} className={s[type]} />
        )}
        <div className={s.icons}>
          <DeleteIcon onClick={() => onDelete(id)} />
        </div>
      </div>
    </div>
  )
}
