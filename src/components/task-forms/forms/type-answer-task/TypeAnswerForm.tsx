import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { DataTypeItemTask, RightAnswerTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import {
  SubmitButtonGroup,
  CheckboxGroup,
  InputsTitleAndDescription,
} from 'components/task-forms/elements'
import {
  useFormContext,
  preparedAndSanitizeTaskText,
  validateFillTabs,
  validateCorrectAnswer,
} from 'components/task-forms/utils'
import { initialValuesAnswerFromSelect, validationSchemaAnswerFromSelect } from './utils'
import { TypeAnswerTaskBlock } from './TypeAnswerTaskBlock'
import s from '../style/RightAnswerForm.module.scss'

export const TypeAnswerForm: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const CURRENT_TASK_TYPE = 'typeAnswerTask'

  const addBlock = useBlocks((state) => state.addBlock)
  const data = useBlocks((state) => state.data)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const closeModal = useModal((state) => state.closeModal)

  const { isOneDifficultyLevel, difficultyLevel, setDifficultyLevel } = useFormContext()

  const currentValuesData = (data.find((item) => item.id === chosenTaskID) ||
    null) as DataTypeItemTask | null

  const checkingRules =
    !!currentValuesData &&
    currentValuesData.type === CURRENT_TASK_TYPE &&
    Object.hasOwn(currentValuesData, 'taskData')

  const initialFormData = checkingRules ? currentValuesData.taskData : initialValuesAnswerFromSelect
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
      validationSchema={validationSchemaAnswerFromSelect}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const { taskText: taskTextInit } = values as RightAnswerTask

        const sanitizeTaskText = preparedAndSanitizeTaskText(
          taskTextInit,
          isOneDifficultyLevel,
          difficultyLevel,
        )

        if (!validateFillTabs(sanitizeTaskText, isOneDifficultyLevel)) {
          return
        }
        if (!validateCorrectAnswer(sanitizeTaskText, isOneDifficultyLevel)) {
          return
        }

        const block = {
          id,
          type: CURRENT_TASK_TYPE,
          taskData: { ...values, taskText: sanitizeTaskText },
        } as DataTypeItemTask

        addBlock(block)
        setDifficultyLevel('easy')
        closeModal()
        resetForm()
      }}>
      <Form className={s.form}>
        <div className={s.inputTabWrapper}>
          <InputsTitleAndDescription />
          <TypeAnswerTaskBlock />
        </div>
        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup onReset={handleReset} />
        </div>
      </Form>
    </Formik>
  )
}
