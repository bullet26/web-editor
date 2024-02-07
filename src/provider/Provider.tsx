/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeConfig } from 'theme/createTheme'
import { DataType, DataTypeItem } from 'types'
import { generateId } from 'utils'
import { BubbleContext, Context, dataAPI } from './initialState'
import { BubbleStateManager } from './BubbleStateManager'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [data, EditData] = useState<DataType>([{ type: 'title', id: '01' }])
  const [isModalOpen, setModalStatus] = useState(false)
  const [chosenTaskID, setChosenTaskID] = useState('')

  const client = new QueryClient()

  // TODO get dataAPI from API
  useEffect(() => {
    EditData(dataAPI)
  }, [])

  const deleteBlock = (id: string) =>
    EditData((prevState) => prevState.filter((item) => item.id !== id))

  const addBlock = (block: DataTypeItem) => {
    if (!block.id) {
      EditData((prevState) => [...prevState, { ...block, id: generateId() }])
    } else {
      EditData((prevState) =>
        prevState.map((item) => {
          if (item.id === block.id) {
            return { ...item, ...block }
          }
          return item
        }),
      )
    }
  }

  const copyBlock = (id: string) => {
    const block = data.find((item) => item.id === id)
    const index = data.findIndex((item) => item.id === id)

    if (!block) {
      return false
    }

    EditData((prevState) => prevState.toSpliced(index, 0, { ...block, id: generateId() }))
  }

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    EditData((prevState) => {
      const draggedBlock = prevState[dragIndex]

      return prevState.toSpliced(dragIndex, 1).toSpliced(hoverIndex, 0, draggedBlock)
    })
  }

  const valueContext = {
    data,
    deleteBlock,
    addBlock,
    copyBlock,
    moveBlock,
    isModalOpen,
    setModalStatus,
    chosenTaskID,
    setChosenTaskID,
  }

  const valueBubbleContext = {
    value: 'initial',
  }

  return (
    <ConfigProvider theme={ThemeConfig}>
      <QueryClientProvider client={client}>
        <DndProvider backend={HTML5Backend}>
          <BubbleContext.Provider value={new BubbleStateManager(valueBubbleContext)}>
            <Context.Provider value={valueContext}>{children}</Context.Provider>
          </BubbleContext.Provider>
        </DndProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}
