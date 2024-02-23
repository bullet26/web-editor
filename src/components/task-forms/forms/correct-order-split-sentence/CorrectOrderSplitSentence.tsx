import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { Divider } from 'antd'
import { DataTypeItemTask, TaskWithoutAnswer } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import {
  SubmitButtonGroup,
  CheckboxGroup,
  DifficultyLevelTab,
  InputsTitleAndDescription,
  Input,
} from '../../elements'
import { useFormContext, validateFillTabs } from '../../utils'
import { initialValuesSplitSentenceOrder, validationSchemaSplitSentenceOrder } from './utils'
import s from '../style/RightAnswerForm.module.scss'

export const CorrectOrderSplitSentence: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const addBlock = useBlocks((state) => state.addBlock)
  const data = useBlocks((state) => state.data)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const closeModal = useModal((state) => state.closeModal)

  const { isOneDifficultyLevel, setDifficultyLevel } = useFormContext()

  const currentValuesData = (data.find((item) => item.id === chosenTaskID) ||
    null) as DataTypeItemTask | null

  const checkingRules =
    !!currentValuesData &&
    currentValuesData.type === 'orderSplitSentence' &&
    Object.hasOwn(currentValuesData, 'taskData')

  const initialFormData = checkingRules
    ? currentValuesData.taskData
    : initialValuesSplitSentenceOrder
  const id = currentValuesData?.id

  const handleReset = () => {
    formikRef.current?.resetForm()
    setDifficultyLevel('easy')
    closeModal()
  }
  // TODO Input index
  // const index: number =
  //   fieldBlock.value.findIndex(
  //     (item: RightAnswerTaskText) => item.difficultyLevel === difficultyLevel,
  //   ) || 0
  // const inputName = `taskText[${index}].taskQuestion`

  // enableReinitialize - Control whether Formik should reset the form if the wrapped component props change (using deep equality).
  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchemaSplitSentenceOrder}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const { taskText } = values as TaskWithoutAnswer

        const block = {
          id,
          type: 'orderSplitSentence',
          taskData: values,
        } as DataTypeItemTask

        if (!validateFillTabs(taskText, isOneDifficultyLevel)) {
          return
        }

        addBlock(block)
        setDifficultyLevel('easy')
        closeModal()
        resetForm()
      }}>
      <Form className={s.form}>
        <div className={s.inputTabWrapper}>
          <InputsTitleAndDescription isOneDifficultyLevel={isOneDifficultyLevel} />
          {isOneDifficultyLevel ? (
            <div style={{ paddingTop: '80px' }}>
              <Divider />
              <Input name="taskText[0].taskQuestion" placeholder="Введіть речення" />
              <Divider />
            </div>
          ) : (
            <DifficultyLevelTab
              childrenOption={
                <div style={{ marginTop: '45px' }}>
                  <Divider />
                  <Input name="taskText[1].taskQuestion" placeholder="Введіть речення" />
                  <Divider />
                </div>
              }
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
