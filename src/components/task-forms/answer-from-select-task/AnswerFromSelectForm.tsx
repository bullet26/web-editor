import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { DataTypeItemTask, RightAnswerTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import {
  SubmitButtonGroup,
  CheckboxGroup,
  DifficultyLevelTab,
  InputsTitleAndDescription,
  AddSkipPutBlock,
} from '../elements'
import {
  initialValuesAnswerFromSelect,
  preparedAndSanitizeTaskText,
  validateTabAndCorrectAnswer,
  validationSchemaAnswerFromSelect,
} from '../utils'
import s from '../style/RightAnswerForm.module.scss'

export const AnswerFromSelectForm: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const addBlock = useBlocks((state) => state.addBlock)
  const data = useBlocks((state) => state.data)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const difficultyLevel = useChosenTask((state) => state.difficultyLevel)
  const setDifficultyLevel = useChosenTask((state) => state.setDifficultyLevel)
  const isOneDifficultyLevel = useChosenTask((state) => state.isOneDifficultyLevel)
  const closeModal = useModal((state) => state.closeModal)

  const currentValuesData = (data.find((item) => item.id === chosenTaskID) ||
    null) as DataTypeItemTask | null

  const checkingRules =
    !!currentValuesData &&
    currentValuesData.type === 'rightAnswerTask' &&
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

        if (!validateTabAndCorrectAnswer(sanitizeTaskText, isOneDifficultyLevel)) {
          return
        }

        const block = {
          id,
          type: 'rightAnswerTask',
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
          {isOneDifficultyLevel ? (
            <AddSkipPutBlock editorStyle={{ marginTop: '60px' }} skipType="rectangle" />
          ) : (
            <DifficultyLevelTab
              childrenOption={<AddSkipPutBlock skipType="rectangle" />}
              easyLevelValueSelector="taskText[0].taskQuestion"
              middleLevelValueSelector="taskText[1].taskQuestion"
              hardLevelValueSelector="taskText[2].taskQuestion"
            />
          )}
        </div>

        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup onReset={handleReset} />
        </div>
      </Form>
    </Formik>
  )
}
