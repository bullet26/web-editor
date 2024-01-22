/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { ThemeConfig } from 'theme/createTheme'
import { DataType, DataTypeItem } from 'types'
import { generateId } from 'utils'

const dataAPI: DataType = [
  {
    type: 'title',
    id: '01',
    text: 'Тема: Привітання та особиста інформація',
  },
  {
    type: 'subtitle',
    id: '02',
    text: 'Навчитися вітатися, представлятися, запитувати та давати особисту інформацію про себе та інших.',
  },
  {
    type: 'text',
    id: '04',
    theme: 'Привітання',
    text: '(hello, hi, good morning, good afternoon, good evening, good night, goodbye, bye, see you), особові займенники (I, you, he, she, it, we, they), присвійні займенники (my, your, his, her, its, our, their), числівники (one, two, three, ..., ten), країни та національності (Ukraine, Ukrainian, France, French, etc.), професії (teacher, student, doctor, engineer, etc.), сім`я (mother, father, sister, brother, etc.).',
  },
  {
    type: 'image',
    id: '05',
    url: 'https://images.squarespace-cdn.com/content/v1/5d6aacb29e0b8f0001610a06/1696903638201-WWXSFZYD87UQ8J0EGQM4/shutterstock_759361057.jpg?format=2500w',
  },
]

const Context = createContext<{
  dataAPI: DataType
  data: DataType
  deleteBlock: (id: string) => void
  addBlock: (block: DataTypeItem) => void
  copyBlock: (id: string) => void
  isModalOpen: boolean
  setModalStatus: (status: boolean) => void
  chosenTaskID: string
  setChosenTaskID: (taskID: string) => void
}>({
  dataAPI: [],
  data: [],
  deleteBlock: () => {},
  addBlock: () => {},
  copyBlock: () => {},
  isModalOpen: false,
  setModalStatus: () => {},
  chosenTaskID: '',
  setChosenTaskID: () => {},
})

export default function Providers({ children }: { children: ReactNode }) {
  const [data, EditData] = useState<DataType>([{ type: 'title', id: '01' }])
  const [isModalOpen, setModalStatus] = useState(false)
  const [chosenTaskID, setChosenTaskID] = useState('')

  // TODO get from API
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

  const value = {
    dataAPI,
    data,
    deleteBlock,
    addBlock,
    copyBlock,
    isModalOpen,
    setModalStatus,
    chosenTaskID,
    setChosenTaskID,
  }
  return (
    <ConfigProvider theme={ThemeConfig}>
      <Context.Provider value={value}>{children}</Context.Provider>
    </ConfigProvider>
  )
}

export const useMyContext = () => useContext(Context)
