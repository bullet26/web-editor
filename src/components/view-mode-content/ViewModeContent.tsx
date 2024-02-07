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

  return (
    <div className={s.wrapper}>
      <div className={s.buttonGroup}>
        <Button type="primary" shape="round" onClick={onEditClick}>
          Редагувати
        </Button>
      </div>
      {data.map(({ text = '', type, id, url, taskData, imageCaption, tableColumns }) => (
        <Fragment key={id}>
          {type === 'table' && (
            <div className={s.grid}>
              {tableColumns?.map((item) => {
                if (item.type === 'image') {
                  return (
                    <div key={item.id}>
                      <img src={item.url} alt="lesson" />
                      <div>{item.imageCaption}</div>
                    </div>
                  )
                }
                if (item.type === 'custom') {
                  return (
                    <div
                      key={item.id}
                      className={s[type]}
                      dangerouslySetInnerHTML={{ __html: item.text || '' }}
                    />
                  )
                }
                return <span key={item.id}>{item.type}</span>
              })}
            </div>
          )}
          {type === 'image' && (
            <div className={s[type]}>
              <img src={url} alt="lesson" />
              <div>{imageCaption}</div>
            </div>
          )}
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
