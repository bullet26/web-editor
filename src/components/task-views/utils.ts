import { TaskType, RightAnswerTask, TaskWithoutAnswer, CompareTask, CategorizeTask } from 'types'

export const isRightAnswerTask = (task?: TaskType): task is RightAnswerTask => {
  if (!task) return false
  return Object.hasOwn(task.taskText[0], 'taskAnswers')
}

export const isCompareTask = (task?: TaskType): task is CompareTask => {
  if (!task) return false
  return Object.hasOwn(task.taskText[0], 'wordPairs')
}

export const isSplitSentenceTask = (task?: TaskType): task is TaskWithoutAnswer => {
  if (!task) return false
  return (
    Object.hasOwn(task.taskText[0], 'taskQuestion') &&
    !Object.hasOwn(task.taskText[0], 'taskAnswers')
  )
}

export const isCategorizeTask = (task?: TaskType): task is CategorizeTask => {
  if (!task) return false
  return Object.hasOwn(task.taskText[0], 'groups')
}
