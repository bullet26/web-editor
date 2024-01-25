import { FC, MouseEvent, useRef, useState } from 'react'
import { Button } from 'antd'
import { Input } from '../elements'
import { InputFromEditableDiv } from './add-skip'
import s from '../Form.module.scss'
import { coldColors } from './add-skip/utils'

export const RightAnswerPutBlock: FC = () => {
  const inputName = 'taskText'
  const inputRef = useRef<HTMLElement>(null)

  const [counterSkip, setCounterSkip] = useState(1)

  const addSkip = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault() // fix for move cursor in the end

    const skipItem = `&nbsp;<span contentEditable=false class="skip" data-skip=${counterSkip} style="border-bottom-color: ${coldColors[counterSkip]}"/>`
    if (inputRef.current) {
      document.execCommand('insertHTML', false, skipItem)
      setCounterSkip((prevState) => prevState + 1)
    }
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
        name={inputName}
        innerRef={inputRef}
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
