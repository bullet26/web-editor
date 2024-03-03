import { FC } from 'react'
import { useField } from 'formik'
import { useFormContext } from 'components/task-forms/utils'
import { InputTrueOrFalse, DifficultyLevelTab } from 'components/task-forms/elements'

export const TrueOrFalseTaskBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].taskItemData')
  const [fieldMiddle] = useField('taskText[1].taskItemData')
  const [fieldHard] = useField('taskText[2].taskItemData')

  return isOneDifficultyLevel ? (
    <InputTrueOrFalse wrapperStyle={{ paddingTop: '80px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<InputTrueOrFalse wrapperStyle={{ marginTop: '45px' }} />}
      easyLevelWarningCondition={!fieldEasy.value?.question || fieldEasy.value.question.length < 10}
      middleLevelWarningCondition={
        !fieldMiddle.value?.question || fieldMiddle.value.question.length < 10
      }
      hardLevelWarningCondition={!fieldHard.value?.question || fieldHard.value.question.length < 10}
    />
  )
}
