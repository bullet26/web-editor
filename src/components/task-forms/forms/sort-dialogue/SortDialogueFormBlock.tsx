import { FC } from 'react'
import { useField } from 'formik'
import { SortDialogueSentence } from 'types'
import { useFormContext } from 'components/task-forms/utils'
import { CreateDialogue, DifficultyLevelTab } from 'components/task-forms/elements'

export const SortDialogueFormBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField('taskText[0].sentences')
  const [fieldMiddle] = useField('taskText[1].sentences')
  const [fieldHard] = useField('taskText[2].sentences')

  return isOneDifficultyLevel ? (
    <CreateDialogue editorStyle={{ marginTop: '60px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<CreateDialogue />}
      easyLevelWarningCondition={
        !fieldEasy.value || !fieldEasy.value.every((item: SortDialogueSentence) => !!item?.sentence)
      }
      middleLevelWarningCondition={
        !fieldMiddle.value ||
        !fieldMiddle.value.every((item: SortDialogueSentence) => !!item?.sentence)
      }
      hardLevelWarningCondition={
        !fieldHard.value || !fieldHard.value.every((item: SortDialogueSentence) => !!item?.sentence)
      }
    />
  )
}
