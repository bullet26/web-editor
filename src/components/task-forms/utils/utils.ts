/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react'
import { DifficultyLevel } from 'types'
import DOMPurify from 'dompurify'

export const convertDifficultyLevel = (difficultyLevel: string) => {
  switch (difficultyLevel) {
    case 'easy':
      return 'Легкий'
    case 'middle':
      return 'Середній'
    case 'hard':
      return 'Складний'
    default:
      return difficultyLevel
  }
}

// XSS sanitizer for HTML,
export const sanitizeText = (taskText: string) => {
  return DOMPurify.sanitize(taskText || '', {
    ALLOWED_ATTR: ['style', 'class', 'contentEditable', 'data-skip'],
  })
}

export const FormContext = createContext<{
  isOneDifficultyLevel: boolean
  difficultyLevel: DifficultyLevel
  setDifficultyLevelShowStatus: (_status: boolean) => void
  setDifficultyLevel: (_value: DifficultyLevel) => void
}>({
  isOneDifficultyLevel: false,
  difficultyLevel: 'easy',
  setDifficultyLevelShowStatus: (_status: boolean) => {},
  setDifficultyLevel: (_value: DifficultyLevel) => {},
})

export const useFormContext = () => useContext(FormContext)
