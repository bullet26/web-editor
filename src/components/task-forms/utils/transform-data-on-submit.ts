import {
  DifficultyLevel,
  RightAnswerTaskText,
  TaskTextWithoutAnswer,
  CompareTaskText,
  CategorizeTaskText,
} from 'types'
import { sanitizeTaskText } from './utils'

export const preparedAndSanitizeTaskText = (
  taskTextInit: RightAnswerTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { taskQuestion, taskAnswers } = taskTextInit.find(
      (item: RightAnswerTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { taskQuestion: '', taskAnswers: [] }

    taskText = [
      {
        taskQuestion,
        taskAnswers,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return sanitizeTaskText(taskText)
}

export const preparedTaskQuestionText = (
  taskTextInit: TaskTextWithoutAnswer[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { taskQuestion } = taskTextInit.find(
      (item: TaskTextWithoutAnswer) => item.difficultyLevel === difficultyLevel,
    ) || { taskQuestion: '' }

    taskText = [
      {
        taskQuestion,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return taskText
}

export const preparedWordPairsTaskText = (
  taskTextInit: CompareTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { wordPairs } = taskTextInit.find(
      (item: CompareTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { wordPairs: [] }

    taskText = [
      {
        wordPairs,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return taskText
}

export const preparedCategorizeTaskText = (
  taskTextInit: CategorizeTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { groups } = taskTextInit.find(
      (item: CategorizeTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { groups: [] }

    taskText = [
      {
        groups,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return taskText
}
