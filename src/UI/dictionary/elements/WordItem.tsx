import { FC } from 'react'
import { Divider, Button } from 'antd'
import s from '../Dictionary.module.scss'

interface WordItemProps {
  buttonType: 'add' | 'delete'
  word: string
  transcription: string
  translation: string
}

export const WordItem: FC<WordItemProps> = (props) => {
  const { buttonType, word, transcription, translation } = props

  return (
    <>
      <div className={s.wordWrapper}>
        <div>
          <span className={s.word}>
            <span>{word}</span> <span>{transcription}</span>
          </span>
          <span className={s.dash}>—</span>
          <span className={s.translationWord}>{translation}</span>
        </div>
        {buttonType === 'add' && (
          <Button shape="round" type="primary" size="small">
            Додати
          </Button>
        )}
        {buttonType === 'delete' && (
          <Button type="text" style={{ color: 'tomato' }}>
            Видалити
          </Button>
        )}
      </div>
      <Divider className={s.divider} />
    </>
  )
}
