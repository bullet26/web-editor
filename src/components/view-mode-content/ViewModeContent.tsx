/* eslint-disable react/no-danger */
import { FC, Fragment } from 'react'
import { Button } from 'antd'
import { useMyContext } from 'provider'
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
        <Button type="primary" onClick={onEditClick}>
          Редагувати
        </Button>
      </div>
      {data.map(({ text = '', theme = '', type, id, url }) => (
        <Fragment key={id}>
          {type === 'text' && (
            <>
              <div className={s.theme} dangerouslySetInnerHTML={{ __html: theme }} />
              <div className={s[type]} dangerouslySetInnerHTML={{ __html: text }} />
            </>
          )}
          {type === 'image' && <img src={url} alt="lesson" />}
          {(type === 'title' || type === 'subtitle' || type === 'note' || type === 'custom') && (
            <div className={s[type]} dangerouslySetInnerHTML={{ __html: text }} />
          )}
        </Fragment>
      ))}
    </div>
  )
}
