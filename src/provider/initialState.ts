import { createContext } from 'react'
import { DataType, DataTypeItem } from 'types'
import { BubbleStateManager } from './BubbleStateManager'

export const dataAPI: DataType = [
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
    type: 'custom',
    id: '04',
    text: '(hello, hi, good morning, good afternoon, good evening, good night, goodbye, bye, see you), особові займенники (I, you, he, she, it, we, they), присвійні займенники (my, your, his, her, its, our, their), числівники (one, two, three, ..., ten), країни та національності (Ukraine, Ukrainian, France, French, etc.), професії (teacher, student, doctor, engineer, etc.), сім`я (mother, father, sister, brother, etc.).',
  },
  {
    type: 'image',
    id: '05',
    url: 'https://images.squarespace-cdn.com/content/v1/5d6aacb29e0b8f0001610a06/1696903638201-WWXSFZYD87UQ8J0EGQM4/shutterstock_759361057.jpg?format=2500w',
  },
]

export const Context = createContext<{
  data: DataType
  deleteBlock: (id: string) => void
  addBlock: (block: DataTypeItem) => void
  copyBlock: (id: string) => void
  moveBlock: (dragIndex: number, hoverIndex: number) => void
  isModalOpen: boolean
  setModalStatus: (status: boolean) => void
  chosenTaskID: string
  setChosenTaskID: (taskID: string) => void
}>({
  data: [],
  deleteBlock: () => {},
  addBlock: () => {},
  copyBlock: () => {},
  moveBlock: () => {},
  isModalOpen: false,
  setModalStatus: () => {},
  chosenTaskID: '',
  setChosenTaskID: () => {},
})

export const BubbleContext = createContext({} as BubbleStateManager)
