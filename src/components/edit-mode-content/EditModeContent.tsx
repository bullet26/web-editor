import { FC } from 'react'
import { Button } from 'antd'
import { useMyContext } from 'provider'
import { getLabel } from 'utils'
import { Paragraph } from 'UI'
import s from './EditModeContent.module.scss'

interface EditModeContentProps {
  onViewClick: () => void
}

export const EditModeContent: FC<EditModeContentProps> = (props) => {
  const { onViewClick } = props
  const { data, deleteBlock, addBlock } = useMyContext()

  return (
    <>
      <div className={s.buttonGroup}>
        <Button type="primary" onClick={onViewClick}>
          Переглянути
        </Button>
      </div>

      {data.map(({ type, text, url, id }) => (
        <Paragraph
          key={id}
          id={id}
          label={getLabel(type)}
          type={type}
          text={text}
          url={url}
          onDelete={deleteBlock}
        />
      ))}
      <Button onClick={() => addBlock({ type: 'text', id: '' })} type="primary">
        Додати блок
      </Button>
    </>
  )
}
