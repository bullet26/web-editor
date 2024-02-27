import { RightAnswerTaskText, RightAnswerTask } from 'types'

export type TaskTextWithoutAnswer = Omit<RightAnswerTaskText, 'taskAnswers'>

export interface TaskWithoutAnswer extends Omit<RightAnswerTask, 'taskText'> {
  taskText: TaskTextWithoutAnswer[]
}
