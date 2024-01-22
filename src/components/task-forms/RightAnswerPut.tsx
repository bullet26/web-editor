import { FC, useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, Divider } from 'antd'
import { DataTypeItem, DataTypeItemTask, RightAnswerTask } from 'types'
import { useMyContext } from 'provider'
import { Input, SubmitButtonGroup, DifficultyLevelTab, CheckboxGroup } from './elements'
import { initialValuesRightAnswerPut, validationSchemaRightAnswerPut } from './utils'
import s from './Form.module.scss'

interface RightAnswerPutProps {
  taskData?: DataTypeItem
}

export const RightAnswerPut: FC<RightAnswerPutProps> = (props) => {
  const { setModalStatus, addBlock } = useMyContext()
  const { taskData } = props
  const [id, setID] = useState('')

  const [initialFormData, setInitialFormData] = useState<RightAnswerTask>(
    initialValuesRightAnswerPut,
  )

  useEffect(() => {
    if (taskData && taskData.type === 'rightAnswerTask' && Object.hasOwn(taskData, 'taskData')) {
      const typedObject = taskData as DataTypeItemTask
      console.log(typedObject)
      setID(typedObject.id)
      setInitialFormData(typedObject.taskData)
    }
  }, [taskData])

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchemaRightAnswerPut}
      onSubmit={(values, { resetForm }) => {
        addBlock({ id, type: 'rightAnswerTask', taskData: values })
        setModalStatus(false)
        resetForm()
      }}
      onReset={() => {
        setModalStatus(false)
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
        <div className={s.inputTabWrapper}>
          <div className={s.inputWrapper}>
            <Input placeholder="Введіть підзаголовок" name="subtitle" />
          </div>
          <Button shape="round" type="default" className={s.blueBtn}>
            Додати пропуск
          </Button>
        </div>
        <Input
          placeholder="Введіть текст"
          type="textarea"
          name="taskText"
          style={{ margin: '16px 0' }}
        />
        <div className={s.inputTabWrapper}>
          <div className={s.blockTitle}>Варіанти відповідей</div>
          <Button shape="round" type="default" className={s.redBtn}>
            + Слово
          </Button>
        </div>

        <div className={s.checkboxButtonWrapper}>
          <CheckboxGroup />
          <SubmitButtonGroup />
        </div>
      </Form>
    </Formik>
  )
}
