import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { DataTypeItemTask, CompareTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import {
  SubmitButtonGroup,
  CheckboxGroup,
  InputsTitleAndDescription,
} from 'components/task-forms/elements'
import {
  useFormContext,
  validateComparePairs,
  preparedWordPairsTaskText,
} from 'components/task-forms/utils'
import { initialValuesCompare, validationSchemaCompare } from './utils'
import { CompareTaskBlock } from './CompareTaskBlock'
import s from '../style/RightAnswerForm.module.scss'

export const CompareForm: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const CURRENT_TASK_TYPE = 'compareTask'

  const addBlock = useBlocks((state) => state.addBlock)
  const getBlocksInCurrentChapter = useBlocks((state) => state.getBlocksInCurrentChapter)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const closeModal = useModal((state) => state.closeModal)

  const { isOneDifficultyLevel, setDifficultyLevel, difficultyLevel } = useFormContext()

  const currentValuesData = (getBlocksInCurrentChapter().find((item) => item.id === chosenTaskID) ||
    null) as DataTypeItemTask | null

  const checkingRules =
    !!currentValuesData &&
    currentValuesData.type === CURRENT_TASK_TYPE &&
    Object.hasOwn(currentValuesData, 'taskData')

  const initialFormData = checkingRules ? currentValuesData.taskData : initialValuesCompare
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
      validationSchema={validationSchemaCompare}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const { taskText: taskTextInit } = values as CompareTask

        const taskText = preparedWordPairsTaskText(
          taskTextInit,
          isOneDifficultyLevel,
          difficultyLevel,
        )

        if (!validateComparePairs(taskText, isOneDifficultyLevel)) {
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
          <CompareTaskBlock />
        </div>
        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup onReset={handleReset} />
        </div>
      </Form>
    </Formik>
  )
}
