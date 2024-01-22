/* eslint-disable react/no-danger */
import { FC, Fragment } from 'react'
import { Button } from 'antd'
import { useMyContext } from 'provider'
import { RightAnswerView } from 'components'
import s from './ViewModeContent.module.scss'

interface ViewModeContentProps {
  onEditClick: () => void
}
export const ViewModeContent: FC<ViewModeContentProps> = (props) => {
  const { onEditClick } = props

  const { data } = useMyContext()

  console.log(data)

  return (
    <div className={s.wrapper}>
      <div className={s.buttonGroup}>
        <Button type="primary" shape="round" onClick={onEditClick}>
          Редагувати
        </Button>
      </div>
      {data.map(({ text = '', theme = '', type, id, url, taskData }) => (
        <Fragment key={id}>
          {type === 'text' && (
            <>
              <div className={s[type]}>{theme}</div>
              <div className={s[type]}>{text}</div>
            </>
          )}
          {type === 'image' && <img src={url} alt="lesson" />}
          {type === 'custom' && (
            <div className={s[type]} dangerouslySetInnerHTML={{ __html: text }} />
          )}
          {(type === 'title' || type === 'subtitle' || type === 'note') && (
            <div className={s[type]}>{text}</div>
          )}
          {type === 'rightAnswerTask' && <RightAnswerView data={taskData} id={id} mode="view" />}
        </Fragment>
      ))}
    </div>
  )
}
