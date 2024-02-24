import { DifficultyLevel, RightAnswerTaskText, TaskTextWithoutAnswer } from 'types'
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
