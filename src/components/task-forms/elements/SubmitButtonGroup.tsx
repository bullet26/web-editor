import { FC } from 'react'
import { Button } from 'antd'
import s from './FormElements.module.scss'

interface SubmitButtonGroupPrps {
  onReset: () => void
}

export const SubmitButtonGroup: FC<SubmitButtonGroupPrps> = (props) => {
  const { onReset } = props

  return (
    <div className={s.buttonGroup}>
      <Button
        className={s.cancelBtn}
        shape="round"
        type="default"
        htmlType="reset"
        onClick={onReset}>
        Скасувати
      </Button>
      <Button className={s.submitBtn} shape="round" type="primary" htmlType="submit">
        Зберегти
      </Button>
    </div>
  )
}
