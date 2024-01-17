import { useState } from 'react'
import { Button } from 'antd'
import { DataTypeItem } from 'types'
import { Paragraph } from 'UI'
import { generateId, getLabel } from 'utils'
import s from './CreateModeContent.module.scss'

export const CreateModeContent = () => {
  const title: DataTypeItem = { type: 'title', id: '01' }
  const subtitle: DataTypeItem = { type: 'subtitle', id: '02' }
  const theme: DataTypeItem = { type: 'theme', id: '03' }
  const text: DataTypeItem = { type: 'text', id: '04' }
  const image: DataTypeItem = { type: 'image', id: '05' }

  const [pageBlocks, setPageBlocks] = useState([title, subtitle, theme, text, image])

  const addBlock = () => setPageBlocks((prevState) => [...prevState, { ...text, id: generateId() }])

  const deleteBlock = (id: string) =>
    setPageBlocks((prevState) => prevState.filter((item) => item.id !== id))

  return (
    <div className={s.wrapper}>
      {pageBlocks.map(({ type, id }) => (
        <Paragraph
          key={id}
          id={id}
          label={getLabel(type)}
          type={type}
          placeholder="Введіть текст"
          onDelete={deleteBlock}
        />
      ))}

      <Button onClick={addBlock} type="primary">
        Додати блок
      </Button>
    </div>
  )
}
