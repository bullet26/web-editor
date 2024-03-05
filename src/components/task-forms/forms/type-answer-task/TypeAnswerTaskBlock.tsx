import { FC } from 'react'
import { useField } from 'formik'
import { useFormContext } from 'components/task-forms/utils'
import { AddSkipPutBlock, DifficultyLevelTab } from 'components/task-forms/elements'

export const TypeAnswerTaskBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].taskQuestion')
  const [fieldMiddle] = useField('taskText[1].taskQuestion')
  const [fieldHard] = useField('taskText[2].taskQuestion')

  return isOneDifficultyLevel ? (
    <AddSkipPutBlock
      editorStyle={{ marginTop: '60px' }}
      skipType="rectangle"
      abilityHideAnswerBlock
      onlyCorrectAnswer
    />
  ) : (
    <DifficultyLevelTab
      childrenOption={
        <AddSkipPutBlock skipType="rectangle" abilityHideAnswerBlock onlyCorrectAnswer />
      }
      easyLevelWarningCondition={!fieldEasy.value || fieldEasy.value.length < 10}
      middleLevelWarningCondition={!fieldMiddle.value || fieldMiddle.value.length < 10}
      hardLevelWarningCondition={!fieldHard.value || fieldHard.value.length < 10}
    />
  )
}
