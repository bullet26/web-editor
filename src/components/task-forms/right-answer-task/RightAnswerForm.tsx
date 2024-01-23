import { FC, useEffect, useState, useRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { Divider } from 'antd'
import { DataTypeItem, DataTypeItemTask, RightAnswerTask } from 'types'
import { useMyContext } from 'provider'
import { Input, SubmitButtonGroup, DifficultyLevelTab, CheckboxGroup } from '../elements'
import { initialValuesRightAnswerPut, validationSchemaRightAnswerPut } from '../utils'
import { RightAnswerPutBlock } from './RightAnswerPutBlock'
import s from '../Form.module.scss'

interface RightAnswerPutProps {
  taskData?: DataTypeItem
}

export const RightAnswerForm: FC<RightAnswerPutProps> = (props) => {
  const { taskData } = props
  const { setModalStatus, addBlock } = useMyContext()

  type FormValues = object
  const formikRef = useRef<FormikProps<FormValues>>(null)

  const [id, setID] = useState('')
  const [initialFormData, setInitialFormData] = useState<RightAnswerTask>(
    initialValuesRightAnswerPut,
  )

  useEffect(() => {
    if (taskData && taskData.type === 'rightAnswerTask' && Object.hasOwn(taskData, 'taskData')) {
      const typedObject = taskData as DataTypeItemTask

      setID(typedObject.id)
      setInitialFormData(typedObject.taskData)
    } else {
      setID('')
      setInitialFormData(initialValuesRightAnswerPut)
    }
  }, [taskData])

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
