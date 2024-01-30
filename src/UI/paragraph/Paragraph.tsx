/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input } from 'antd'
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
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const { deleteBlock, addBlock, copyBlock } = useMyContext()

  const { text, type, id, url, theme, taskData } = props
  const { label, placeholder } = getLabel(type)

  const onChangeDraft = (inputText: string) => {
    addBlock({ type: 'custom', id, text: inputText })
  }

  const onChangeImage = (inputUrl: string) => {
    addBlock({ type: 'image', id, url: inputUrl })
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
    </>
  )
}
