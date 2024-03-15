import {
  DifficultyLevel,
  RightAnswerTaskText,
  TaskTextWithoutAnswer,
  CompareTaskText,
  CategorizeTaskText,
  SortDialogueTaskText,
  TrueOrFalseTaskText,
  CorrectMistakesText,
} from 'types'
import { sanitizeText } from './utils'

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

  return taskText.map((item) => ({
    ...item,
    taskQuestion: sanitizeText(item?.taskQuestion),
  }))
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

  return taskText.map((item) => ({
    ...item,
    taskQuestion: item.taskQuestion.replace(/\s+/g, ' '),
  }))
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

export const preparedSortDialogueTaskText = (
  taskTextInit: SortDialogueTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { sentences } = taskTextInit.find(
      (item: SortDialogueTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { sentences: [] }

    taskText = [
      {
        sentences,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return taskText
}

export const preparedTrueOrFalseTaskText = (
  taskTextInit: TrueOrFalseTaskText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { taskItemData } = taskTextInit.find(
      (item: TrueOrFalseTaskText) => item.difficultyLevel === difficultyLevel,
    ) || { taskItemData: { id: '', format: 'trueOrFalse', question: '', answer: true } }

    taskText = [
      {
        taskItemData,
        difficultyLevel: 'easy' as DifficultyLevel,
      },
    ]
  }

  return taskText
}

export const preparedCorrectMistakesSentences = (
  taskTextInit: CorrectMistakesText[],
  isOneDifficultyLevel: boolean,
  difficultyLevel: DifficultyLevel,
) => {
  let taskText = taskTextInit
  if (isOneDifficultyLevel) {
    const { wrongSentence, correctSentence } = taskTextInit.find(
      (item: CorrectMistakesText) => item.difficultyLevel === difficultyLevel,
    ) || { wrongSentence: '', correctSentence: '' }

    taskText = [
      {
        difficultyLevel: 'easy' as DifficultyLevel,
        wrongSentence,
        correctSentence,
      },
    ]
  }

  return taskText
}
