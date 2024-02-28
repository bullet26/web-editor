/* eslint-disable no-restricted-syntax */

import {
  RightAnswerTaskText,
  TaskTextWithoutAnswer,
  CompareTaskText,
  CategorizeTaskText,
} from 'types'
import { message } from 'antd'
import { convertDifficultyLevel } from './utils'

export const validateFillTabs = (
  taskText: RightAnswerTaskText[] | TaskTextWithoutAnswer[],
  isOneDifficultyLevel: boolean,
) => {
  const tabNotFilled: string[] = []
  taskText.forEach((item) => {
    if (!item.taskQuestion || item.taskQuestion.length < 10) {
      tabNotFilled.push(convertDifficultyLevel(item.difficultyLevel))
    }
  })

  if (tabNotFilled.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнений текст задання'
        : `Не заповнений текст задання на: ${tabNotFilled.join(', ')} рівень`,
    )
    return false
  }
  return true
}

export const validateCorrectAnswer = (
  taskText: RightAnswerTaskText[],
  isOneDifficultyLevel: boolean,
) => {
  const res: string[] = []
  taskText.forEach(({ taskAnswers, difficultyLevel }) =>
    taskAnswers.forEach(({ answers }) =>
      answers.forEach(({ type, value }) => {
        if (type === 'correct' && !value) {
          res.push(convertDifficultyLevel(difficultyLevel))
        }
      }),
    ),
  )
  const tabNotFilledCorrectAnswer = Array.from(new Set(res))

  if (tabNotFilledCorrectAnswer.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнена правильна відповідь'
        : `Не заповнена правильна відповідь на: ${tabNotFilledCorrectAnswer.join(', ')} рівень`,
    )
    return false
  }

  return true
}

export const validateComparePairs = (
  taskText: CompareTaskText[],
  isOneDifficultyLevel: boolean,
) => {
  const tabNotFilled: string[] = []

  taskText.forEach((itemLevel) => {
    if (
      !itemLevel.wordPairs.length ||
      !itemLevel.wordPairs.every((item) => !!item?.left && !!item?.right)
    ) {
      tabNotFilled.push(convertDifficultyLevel(itemLevel.difficultyLevel))
    }
  })

  if (tabNotFilled.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнені пари значень'
        : `Не заповнені  пари значень на: ${tabNotFilled.join(', ')} рівень`,
    )
    return false
  }
  return true
}

export const validateCategorizeGroup = (
  taskText: CategorizeTaskText[],
  isOneDifficultyLevel: boolean,
) => {
  const mainWordNotFilled: string[] = []
  const otherWordNotFilled: string[] = []

  taskText.forEach((item) => {
    if (!item.groups.length || !item.groups.every((subitem) => !!subitem?.mainWord)) {
      mainWordNotFilled.push(convertDifficultyLevel(item.difficultyLevel))
    }
  })

  if (mainWordNotFilled.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнені заголовки груп(и)'
        : `Не заповнені  заголовки груп(и) на: ${mainWordNotFilled.join(', ')} рівень`,
    )
    return false
  }

  for (const item of taskText) {
    for (const { otherWords } of item.groups) {
      if (!otherWords.every((subitem) => !!subitem?.word)) {
        otherWordNotFilled.push(convertDifficultyLevel(item.difficultyLevel))
        break
      }
    }
  }

  if (otherWordNotFilled.length) {
    message.error(
      isOneDifficultyLevel
        ? 'Не заповнені значення в групі'
        : `Не заповнені значення в групі на: ${otherWordNotFilled.join(', ')} рівень`,
    )
    return false
  }

  return true
}
