import { FC } from 'react'
import { useField } from 'formik'
import { CompareTaskWordPair } from 'types'
import { useFormContext } from 'components/task-forms/utils'
import { CompareBlock, DifficultyLevelTab } from 'components/task-forms/elements'

export const CompareTaskBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].wordPairs')
  const [fieldMiddle] = useField('taskText[1].wordPairs')
  const [fieldHard] = useField('taskText[2].wordPairs')

  return isOneDifficultyLevel ? (
    <CompareBlock editorStyle={{ marginTop: '60px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<CompareBlock />}
      easyLevelWarningCondition={
        !fieldEasy.value ||
        !fieldEasy.value.every((item: CompareTaskWordPair) => !!item?.left && !!item?.right)
      }
      middleLevelWarningCondition={
        !fieldMiddle.value ||
        !fieldMiddle.value.every((item: CompareTaskWordPair) => !!item?.left && !!item?.right)
      }
      hardLevelWarningCondition={
        !fieldHard.value ||
        !fieldHard.value.every((item: CompareTaskWordPair) => !!item?.left && !!item?.right)
      }
    />
  )
}
