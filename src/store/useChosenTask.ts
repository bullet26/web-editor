import { Type } from 'types'
import { create } from 'zustand'

interface IChosenTask {
  chosenTaskID: string | null
  taskType: Type | null
  isOneDifficultyLevel: boolean
  difficultyLevel: 'easy' | 'middle' | 'hard'
  setChosenTaskID: (taskID: string | null) => void
  setChosenTaskType: (taskType: Type) => void
  setDifficultyLevel: (value: 'easy' | 'middle' | 'hard') => void
  setDifficultyLevelShowStatus: (value: boolean) => void
}

export const useChosenTask = create<IChosenTask>()((set) => ({
  chosenTaskID: null,
  taskType: null,
  isOneDifficultyLevel: false,
  difficultyLevel: 'easy',
  setChosenTaskID: (id: string | null) => set({ chosenTaskID: id }),
  setChosenTaskType: (taskType: Type) => set({ taskType }),
  setDifficultyLevel: (value: 'easy' | 'middle' | 'hard') => set({ difficultyLevel: value }),
  setDifficultyLevelShowStatus: (value: boolean) => set({ isOneDifficultyLevel: value }),
}))
