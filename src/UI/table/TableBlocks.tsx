import { FC } from 'react'
import { Radio } from 'antd'
import { useBlocks } from 'store'
import { ChangeIcon } from 'assets'
import { getLabel } from 'utils'
import { DataTypeItem } from 'types'
import { DraftEditor, DropZone } from 'UI'
import s from './TableBock.module.scss'

interface TableBlocksProps {
  tableColumnQuant: number
  data: DataTypeItem[]
  id: string
}

export const TableBlocks: FC<TableBlocksProps> = (props) => {
  const { tableColumnQuant, data, id } = props
  const addBlock = useBlocks((state) => state.addBlock)

  const onChangeTableItem = (itemId: string, type: 'image' | 'custom') => {
    const tableColumns = data.map((item) => {
      if (item.id === itemId) {
        return { type, id: itemId }
      }
      return item
    })

    addBlock({ type: 'table', id, tableColumns })
  }

  const onChangeOrder = () => {
    const tableColumns = data.reverse()
    addBlock({ type: 'table', id, tableColumns })
  }

  const onChangeDraft = (inputText: string, itemId: string = '') => {
    const tableColumns = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, text: inputText }
      }
      return item
    })

    addBlock({ type: 'table', id, tableColumns })
  }

  const onChangeImage = (inputUrl: string, inputImageCaption?: string, itemId: string = '') => {
    const tableColumns = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, url: inputUrl, imageCaption: inputImageCaption }
      }
      return item
    })

    addBlock({ type: 'table', id, tableColumns })
  }

  return (
    <div className={s.grid} style={{ gridTemplateColumns: `repeat(${tableColumnQuant},1fr)` }}>
      {data.map((item, i) => {
        const { label, placeholder } = getLabel(item.type)
        if (item.type === 'image') {
          return (
            <div key={item.id}>
              <div className={s.headerWrapper}>
                <Radio.Group
                  onChange={(e) => onChangeTableItem(item.id, e.target.value)}
                  value={item.type}>
                  <Radio value="custom">Текст</Radio>
                  <Radio value="image">Зображення</Radio>
                </Radio.Group>
                {i === 0 && <ChangeIcon onClick={onChangeOrder} />}
              </div>
              <DropZone
                label={label}
                url={item.url}
                imageCaption={item.imageCaption || ''}
                placeholder={placeholder}
                id={item.id}
                onChange={onChangeImage}
              />
            </div>
          )
        }
        if (item.type === 'custom') {
          return (
            <div key={item.id}>
              <div className={s.headerWrapper}>
                <Radio.Group
                  onChange={(e) => onChangeTableItem(item.id, e.target.value)}
                  value={item.type}>
                  <Radio value="custom">Текст</Radio>
                  <Radio value="image">Зображення</Radio>
                </Radio.Group>
                {i === 0 && <ChangeIcon onClick={onChangeOrder} />}
              </div>
              <DraftEditor
                key={item.id}
                defaultValue={item.text}
                placeholder={placeholder}
                id={item.id}
                onChange={onChangeDraft}
                editorStyle={{ height: '250px' }}
              />
            </div>
          )
        }
        return <span key={item.id}>{item.type}</span>
      })}
    </div>
  )
}
