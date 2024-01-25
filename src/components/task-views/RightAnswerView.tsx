/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { RightAnswerTask } from 'types'
import { useMyContext } from 'provider'
import s from './TaskView.module.scss'

interface RightAnswerViewProps {
  id: string
  data?: RightAnswerTask
  mode: 'view' | 'edit'
}

export const RightAnswerView: FC<RightAnswerViewProps> = (props) => {
  const { data, id, mode } = props
  const { setModalStatus, setChosenTaskID } = useMyContext()

  const onEdit = () => {
    setChosenTaskID(id)
    setModalStatus(true)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <div className={s.subtitle}>{data?.code}</div>
          <div className={s.title}>{data?.title}</div>
        </div>
        <div className={s.difficultyLevel}>
          <span className={s.subtitle}>Рівень складності поточного завдання</span>
          <div className={s.difficultyLevelItems}>
            <span className={data?.difficultyLevel === 'easy' ? s.active : ''}>Легкий</span>
            <span className={data?.difficultyLevel === 'middle' ? s.active : ''}>Середній</span>
            <span className={data?.difficultyLevel === 'hard' ? s.active : ''}>Складний</span>
          </div>
        </div>
      </div>
      <div className={s.subtitle}>{data?.subtitle}</div>
      <div className={s.title} dangerouslySetInnerHTML={{ __html: data?.taskText || '' }} />
      <Button
        type="primary"
        shape="round"
        disabled={mode === 'view'}
        style={{ width: '100%' }}
        onClick={onEdit}>
        Редагувати
      </Button>
    </div>
  )
}
