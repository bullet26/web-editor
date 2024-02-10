import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { Divider } from 'antd'
import DOMPurify from 'dompurify'
import { DataTypeItemTask, RightAnswerTask } from 'types'
import { useBlocks, useChosenTask, useModal } from 'store'
import { Input, SubmitButtonGroup, DifficultyLevelTab, CheckboxGroup } from '../elements'
import { initialValuesRightAnswerPut, validationSchemaRightAnswerPut } from '../utils'
import { RightAnswerPutBlock } from './add-skip'
import s from './RAElements.module.scss'

export const RightAnswerForm: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const addBlock = useBlocks((state) => state.addBlock)
  const data = useBlocks((state) => state.data)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
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
        const taskText = (values as RightAnswerTask).taskText || ''
        // XSS sanitizer for HTML,
        const cleanHTML = DOMPurify.sanitize(taskText, {
          ALLOWED_ATTR: ['style', 'class', 'contentEditable', 'data-skip'],
        })

        const block = {
          id,
          type: 'rightAnswerTask',
          taskData: { ...values, taskText: cleanHTML },
        } as DataTypeItemTask
        addBlock(block)
        closeModal()
        resetForm()
      }}>
      <Form className={s.form}>
        <div className={s.inputTabWrapper}>
          <div className={s.inputWrapper}>
            <Input placeholder="Введіть номер" name="code" />
            <Input placeholder="Введіть назву" name="title" />
          </div>
          <DifficultyLevelTab />
        </div>
        <Divider style={{ margin: '16px 0' }} />
        <RightAnswerPutBlock />

        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup onReset={handleReset} />
        </div>
      </Form>
    </Formik>
  )
}
