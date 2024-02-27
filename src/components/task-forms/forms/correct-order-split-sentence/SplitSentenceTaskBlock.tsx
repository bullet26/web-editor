import { FC } from 'react'
import { useField } from 'formik'
import { useFormContext } from 'components/task-forms/utils'
import { InputForDifTabs, DifficultyLevelTab } from 'components/task-forms/elements'

export const SplitSentenceTaskBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].taskQuestion')
  const [fieldMiddle] = useField('taskText[1].taskQuestion')
  const [fieldHard] = useField('taskText[2].taskQuestion')

  return isOneDifficultyLevel ? (
    <InputForDifTabs style={{ paddingTop: '80px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<InputForDifTabs style={{ marginTop: '45px' }} />}
      easyLevelWarningCondition={!fieldEasy.value || fieldEasy.value.length < 10}
      middleLevelWarningCondition={!fieldMiddle.value || fieldMiddle.value.length < 10}
      hardLevelWarningCondition={!fieldHard.value || fieldHard.value.length < 10}
    />
  )
}
