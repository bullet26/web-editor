import { create } from 'zustand'

interface IChosenTask {
  chosenTaskID: string | null
  isOneDifficultyLevel: boolean
  difficultyLevel: 'easy' | 'middle' | 'hard'
  setChosenTaskID: (taskID: string) => void
  setDifficultyLevel: (value: 'easy' | 'middle' | 'hard') => void
  setDifficultyLevelShowStatus: (value: boolean) => void
}

export const useChosenTask = create<IChosenTask>()((set) => ({
  chosenTaskID: null,
  isOneDifficultyLevel: false,
  difficultyLevel: 'easy',
  setChosenTaskID: (id: string) => set({ chosenTaskID: id }),
  setDifficultyLevel: (value: 'easy' | 'middle' | 'hard') => set({ difficultyLevel: value }),
  setDifficultyLevelShowStatus: (value: boolean) => set({ isOneDifficultyLevel: value }),
}))
