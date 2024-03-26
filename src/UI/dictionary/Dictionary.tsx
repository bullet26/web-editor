import { FC, useState } from 'react'
import { Button, Divider } from 'antd'
import { AddWordModal } from './elements'
import s from './Dictionary.module.scss'

interface DictionaryProps {
  mode: 'view' | 'edit'
}

export const Dictionary: FC<DictionaryProps> = (props) => {
  const { mode } = props

  const [modalStatus, setModalStatus] = useState(false)

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.buttonWrapper}>
          <div className={s.title}>Слова уроку</div>
          {mode === 'edit' && (
            <Button
              shape="circle"
              type="primary"
              style={{ width: '24px' }}
              onClick={() => setModalStatus(true)}>
              +
            </Button>
          )}
        </div>
        <Divider className={s.dividerMain} />
        <div className={s.word}>
          <span>hi</span> <span>[haɪ]</span>
        </div>
        <div className={s.translationWord}>Приві́т</div>
        <Divider style={{ margin: '5px 0' }} />
      </div>
      <AddWordModal isModalOpen={modalStatus} closeModal={() => setModalStatus(false)} />
    </>
  )
}
