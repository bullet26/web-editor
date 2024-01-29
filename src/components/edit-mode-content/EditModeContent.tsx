import { FC } from 'react'
import { Button } from 'antd'
import { useMyContext } from 'provider'
import { Panel, Paragraph } from 'UI'
import s from './EditModeContent.module.scss'

interface EditModeContentProps {
  onViewClick: () => void
}

export const EditModeContent: FC<EditModeContentProps> = (props) => {
  const { onViewClick } = props
  const { data } = useMyContext()

  return (
    <>
      <div className={s.buttonGroup}>
        <Button type="default" className="blueBtn" shape="round" onClick={onViewClick}>
          Попередній перегляд
        </Button>
        <Button type="primary" shape="round">
          Опублікувати
        </Button>
      </div>
      <div className={s.wrapper}>
        <div className={s.paragraphWrapper}>
          {data.map(({ type, text, url, id, theme, taskData }, index) => (
            <Paragraph
              key={id}
              id={id}
              type={type}
              text={text}
              url={url}
              theme={theme}
              taskData={taskData}
              index={index}
            />
          ))}
        </div>
        <Panel />
      </div>
    </>
  )
}
