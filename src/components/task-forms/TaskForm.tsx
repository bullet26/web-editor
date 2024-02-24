/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, useState } from 'react'
import { Type, DifficultyLevel } from 'types'
import { FormContext } from './utils'
import { RightAnswerForm } from './forms'
import { AnswerFromSelectForm } from './forms/answer-from-select-task'
import { CorrectOrderSplitSentence } from './forms/correct-order-split-sentence'

interface TaskFormProps {
  taskType: Type
}

export const TaskForm: FC<TaskFormProps> = (props) => {
  const { taskType } = props

  const [isOneDifficultyLevel, setDifficultyLevelShowStatus] = useState(false)
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('easy')

  return (
    <FormContext.Provider
      value={{
        isOneDifficultyLevel,
        difficultyLevel,
        setDifficultyLevelShowStatus,
        setDifficultyLevel,
      }}>
      {taskType === 'rightAnswerTask' && <RightAnswerForm />}
      {taskType === 'answerFromSelect' && <AnswerFromSelectForm />}
      {taskType === 'orderSplitSentence' && <CorrectOrderSplitSentence />}
    </FormContext.Provider>
  )
}
