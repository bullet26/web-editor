import { FC } from 'react'
import { Button } from 'antd'
import s from './Dictionary.module.scss'

interface DictionaryProps {
  mode: 'view' | 'edit'
}

export const Dictionary: FC<DictionaryProps> = (props) => {
  const { mode } = props

  return (
    <div className={s.wrapper}>
      <div className={s.buttonWrapper}>
        <div className={s.title}>Слова уроку</div>
        {mode === 'edit' && (
          <Button shape="circle" type="primary" style={{ width: '24px' }}>
            +
          </Button>
        )}
      </div>
      <div className={s.divider} />
    </div>
  )
}
