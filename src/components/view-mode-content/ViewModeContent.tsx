/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { useMyContext } from 'provider'
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
        <Button type="primary" onClick={onEditClick}>
          Редагувати
        </Button>
      </div>
      {data.map(({ text = '', type, id, url }) =>
        type === 'image' ? (
          <img key={id} src={url} alt="lesson" />
        ) : (
          <div className={s[type]} dangerouslySetInnerHTML={{ __html: text }} key={id} />
        ),
      )}
    </div>
  )
}
