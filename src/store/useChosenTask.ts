import { Type } from 'types'
import { create } from 'zustand'

interface IChosenTask {
  chosenTaskID: string | null
  taskType: Type | null
  setChosenTaskID: (taskID: string | null) => void
  setChosenTaskType: (taskType: Type) => void
}

export const useChosenTask = create<IChosenTask>()((set) => ({
  chosenTaskID: null,
  taskType: null,
  setChosenTaskID: (id: string | null) => set({ chosenTaskID: id }),
  setChosenTaskType: (taskType: Type) => set({ taskType }),
}))
