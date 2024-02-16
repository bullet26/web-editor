import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { message } from 'antd'
import { DataTypeItemTask, RightAnswerTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import { Input, SubmitButtonGroup, CheckboxGroup, DifficultyLevelTab } from '../elements'
import {
  initialValuesRightAnswerPut,
  preparedAndSanitizeTaskText,
  validateFillTabs,
  validationSchemaRightAnswerPut,
  validateCorrectAnswer,
} from '../utils'
import { RightAnswerPutBlock } from './add-skip'
import s from './RAElements.module.scss'

export const RightAnswerForm: FC = () => {
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

  const initialFormData = checkingRules ? currentValuesData.taskData : initialValuesRightAnswerPut
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
      validationSchema={validationSchemaRightAnswerPut}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const { taskText: taskTextInit } = values as RightAnswerTask

        const sanitizeTaskText = preparedAndSanitizeTaskText(
          taskTextInit,
          isOneDifficultyLevel,
          difficultyLevel,
        )

        const tabNotFilled = validateFillTabs(sanitizeTaskText)
        if (tabNotFilled.length) {
          message.error(`Не всі рівні складності заповнені: ${tabNotFilled.join(', ')}`)
          return
        }

        const tabNotFilledCorrectAnswer = validateCorrectAnswer(sanitizeTaskText)
        if (tabNotFilledCorrectAnswer.length) {
          message.error(
            isOneDifficultyLevel
              ? 'Не заповнена правильна відповідь'
              : `Не заповнена правильна відповідь на: ${tabNotFilledCorrectAnswer.join(', ')} рівень`,
          )
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
          <div className={isOneDifficultyLevel ? s.inputWrapperOneTab : s.inputWrapperThreeTab}>
            <Input
              placeholder="Введіть назву"
              name="title"
              style={{ marginBottom: '16px', width: '514px' }}
            />
            <Input
              placeholder="Введіть що потрібно зробити"
              name="description"
              style={{ width: '514px' }}
            />
          </div>
          {isOneDifficultyLevel ? (
            <RightAnswerPutBlock editorStyle={{ marginTop: '60px' }} />
          ) : (
            <DifficultyLevelTab childrenOption={<RightAnswerPutBlock />} />
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
