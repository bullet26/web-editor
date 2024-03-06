/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, useState } from 'react'
import { Type, DifficultyLevel } from 'types'
import { FormContext } from './utils'
import {
  RightAnswerForm,
  AnswerFromSelectForm,
  CorrectOrderSplitSentence,
  CompareForm,
  CategorizeForm,
  SortDialogueForm,
  TrueOrFalseTask,
  TypeAnswerForm,
  CorrectMistakesForm,
  OnlyOneRightAnswerForm,
} from './forms'

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
      {taskType === 'compareTask' && <CompareForm />}
      {taskType === 'categorizeTask' && <CategorizeForm />}
      {taskType === 'sortDialogue' && <SortDialogueForm />}
      {taskType === 'trueOrFalseTask' && <TrueOrFalseTask />}
      {taskType === 'typeAnswerTask' && <TypeAnswerForm />}
      {taskType === 'correctMistakesTask' && <CorrectMistakesForm />}
      {taskType === 'onlyOneOrTwoRightAnswerTask' && <OnlyOneRightAnswerForm />}
    </FormContext.Provider>
  )
}
