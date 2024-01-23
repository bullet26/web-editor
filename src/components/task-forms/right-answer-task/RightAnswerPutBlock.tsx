import { FC, useRef } from 'react'
import { Button } from 'antd'
import { useField } from 'formik'
import { Input, InputFromEditableDiv } from '../elements'
import s from '../Form.module.scss'

export const RightAnswerPutBlock: FC = () => {
  const [field, , helpers] = useField('taskText')

  const addSkip = () => {
    let inputValue = field.value
    const skipItem = `<span contentEditable=false style="display: inline-block; width: 38px; height: 25px; border-bottom: 2px solid #2D8CFF;"/>`
    inputValue += skipItem
    console.log(inputValue)

    helpers.setValue(inputValue, true)
  }

  return (
    <>
      <div className={s.inputTabWrapper}>
        <div className={s.inputWrapper}>
          <Input placeholder="Введіть підзаголовок" name="subtitle" />
        </div>
        <Button shape="round" type="default" className={s.blueBtn} onClick={addSkip}>
          Додати пропуск
        </Button>
      </div>
      <InputFromEditableDiv
        placeholder="Введіть текст"
        name="taskText"
        style={{ margin: '16px 0' }}
      />
      <div className={s.inputTabWrapper}>
        <div className={s.blockTitle}>Варіанти відповідей</div>
        <Button shape="round" type="default" className={s.redBtn}>
          + Слово
        </Button>
      </div>
    </>
  )
}
