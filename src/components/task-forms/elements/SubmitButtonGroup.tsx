import { Button } from 'antd'
import s from './FormElements.module.scss'

export const SubmitButtonGroup = () => {
  return (
    <div className={s.buttonGroup}>
      <Button className={s.cancelBtn} shape="round" type="default" htmlType="reset">
        Скасувати
      </Button>
      <Button className={s.submitBtn} shape="round" type="primary" htmlType="submit">
        Зберегти
      </Button>
    </div>
  )
}
