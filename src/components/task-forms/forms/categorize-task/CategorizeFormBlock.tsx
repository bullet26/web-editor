import { FC } from 'react'
import { useField } from 'formik'
import { CategorizeTaskGroup } from 'types'
import { useFormContext } from 'components/task-forms/utils'
import { CategorizeBlock, DifficultyLevelTab } from 'components/task-forms/elements'

export const CategorizeFormBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].groups')
  const [fieldMiddle] = useField('taskText[1].groups')
  const [fieldHard] = useField('taskText[2].groups')

  return isOneDifficultyLevel ? (
    <CategorizeBlock wrapperStyle={{ paddingTop: '85px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<CategorizeBlock wrapperStyle={{ paddingTop: '35px' }} />}
      easyLevelWarningCondition={
        !fieldEasy.value ||
        !fieldEasy.value.every(
          (item: CategorizeTaskGroup) => !!item?.mainWord && !!item?.otherWords.length,
        )
      }
      middleLevelWarningCondition={
        !fieldMiddle.value ||
        !fieldMiddle.value.every(
          (item: CategorizeTaskGroup) => !!item?.mainWord && !!item?.otherWords.length,
        )
      }
      hardLevelWarningCondition={
        !fieldHard.value ||
        !fieldHard.value.every(
          (item: CategorizeTaskGroup) => !!item?.mainWord && !!item?.otherWords.length,
        )
      }
    />
  )
}
