import { FC, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { Divider } from 'antd'
import { DataTypeItemTask } from 'types'
import { useMyContext } from 'provider'
import { Input, SubmitButtonGroup, DifficultyLevelTab, CheckboxGroup } from '../elements'
import { initialValuesRightAnswerPut, validationSchemaRightAnswerPut } from '../utils'
import { RightAnswerPutBlock } from './add-skip'
import s from './RAElements.module.scss'

export const RightAnswerForm: FC = () => {
  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const { setModalStatus, addBlock, chosenTaskID, data } = useMyContext()

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
    setModalStatus(false)
  }

  // enableReinitialize - Control whether Formik should reset the form if the wrapped component props change (using deep equality).
  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchemaRightAnswerPut}
      enableReinitialize
      innerRef={formikRef}
      onSubmit={(values, { resetForm }) => {
        const block = { id, type: 'rightAnswerTask', taskData: values } as DataTypeItemTask
        addBlock(block)
        setModalStatus(false)
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
