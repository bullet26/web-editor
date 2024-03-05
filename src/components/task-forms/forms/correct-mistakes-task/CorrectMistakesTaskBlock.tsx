import { FC } from 'react'
import { useField } from 'formik'
import { useFormContext } from 'components/task-forms/utils'
import { InputCorrectWrongSentences, DifficultyLevelTab } from 'components/task-forms/elements'

export const CorrectMistakesTaskBlock: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

  const [fieldEasyCorrectSentence] = useField('taskText[0].correctSentence')
  const [fieldMiddleCorrectSentence] = useField('taskText[1].correctSentence')
  const [fieldHardCorrectSentence] = useField('taskText[2].correctSentence')

  const [fieldEasyWrongSentence] = useField('taskText[0].wrongSentence')
  const [fieldMiddleWrongSentence] = useField('taskText[1].wrongSentence')
  const [fieldHardWrongSentence] = useField('taskText[2].wrongSentence')

  return isOneDifficultyLevel ? (
    <InputCorrectWrongSentences style={{ paddingTop: '80px' }} />
  ) : (
    <DifficultyLevelTab
      childrenOption={<InputCorrectWrongSentences style={{ marginTop: '45px' }} />}
      easyLevelWarningCondition={
        !fieldEasyCorrectSentence.value ||
        fieldEasyCorrectSentence.value.length < 10 ||
        !fieldEasyWrongSentence.value ||
        fieldEasyWrongSentence.value.length < 10
      }
      middleLevelWarningCondition={
        !fieldMiddleCorrectSentence.value ||
        fieldMiddleCorrectSentence.value.length < 10 ||
        !fieldMiddleWrongSentence.value ||
        fieldMiddleWrongSentence.value.length < 10
      }
      hardLevelWarningCondition={
        !fieldHardCorrectSentence.value ||
        fieldHardCorrectSentence.value.length < 10 ||
        !fieldHardWrongSentence.value ||
        fieldHardWrongSentence.value.length < 10
      }
    />
  )
}
