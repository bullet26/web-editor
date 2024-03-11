import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { DataTypeItemTask, TrueOrFalseTask as ITrueOrFalseTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import {
  SubmitButtonGroup,
  CheckboxGroup,
  InputsTitleAndDescription,
} from 'components/task-forms/elements'
import {
  preparedTrueOrFalseTaskText,
  useFormContext,
  validateTrueOrFalse,
} from 'components/task-forms/utils'
import { initialValuesTrueOrFalse, validationSchemaTrueOrFalse } from './utils'
import { TrueOrFalseTaskBlock } from './TrueOrFalseTaskBlock'
import s from '../style/RightAnswerForm.module.scss'

export const TrueOrFalseTask: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const CURRENT_TASK_TYPE = 'trueOrFalseTask'

  const addBlock = useBlocks((state) => state.addBlock)
  const getBlocksInCurrentChapter = useBlocks((state) => state.getBlocksInCurrentChapter)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const closeModal = useModal((state) => state.closeModal)

  const { isOneDifficultyLevel, difficultyLevel, setDifficultyLevel } = useFormContext()

  const currentValuesData = (getBlocksInCurrentChapter().find((item) => item.id === chosenTaskID) ||
    null) as DataTypeItemTask | null

  const checkingRules =
    !!currentValuesData &&
    currentValuesData.type === CURRENT_TASK_TYPE &&
    Object.hasOwn(currentValuesData, 'taskData')

  const initialFormData = checkingRules ? currentValuesData.taskData : initialValuesTrueOrFalse
  const id = currentValuesData?.id

  const handleReset = () => {
    formikRef.current?.resetForm()
    setDifficultyLevel('easy')
    closeModal()
  }

  // enableReinitialize - Control whether Formik should reset the form if the wrapped component props change (using deep equality).
  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchemaTrueOrFalse}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const { taskText: taskTextInit } = values as ITrueOrFalseTask

        const taskText = preparedTrueOrFalseTaskText(
          taskTextInit,
          isOneDifficultyLevel,
          difficultyLevel,
        )

        if (!validateTrueOrFalse(taskText, isOneDifficultyLevel)) {
          return
        }

        const block = {
          id,
          type: CURRENT_TASK_TYPE,
          taskData: { ...values, taskText },
        } as DataTypeItemTask

        addBlock(block)
        setDifficultyLevel('easy')
        closeModal()
        resetForm()
      }}>
      <Form className={s.form}>
        <div className={s.inputTabWrapper}>
          <InputsTitleAndDescription />
          <TrueOrFalseTaskBlock />
        </div>

        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup onReset={handleReset} />
        </div>
      </Form>
    </Formik>
  )
}
