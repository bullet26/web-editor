import { create } from 'zustand'

interface IChosenTask {
  chosenTaskID: string | null
  setChosenTaskID: (taskID: string) => void
}

export const useChosenTask = create<IChosenTask>()((set) => ({
  chosenTaskID: null,
  setChosenTaskID: (id: string) => set({ chosenTaskID: id }),
}))
