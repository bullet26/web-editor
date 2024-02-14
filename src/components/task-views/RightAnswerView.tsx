/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { useChosenTask, useModal } from 'store'
import { RightAnswerTask } from 'types'
import s from './TaskView.module.scss'

interface RightAnswerViewProps {
  id: string
  data?: RightAnswerTask
  mode: 'view' | 'edit'
}

export const RightAnswerView: FC<RightAnswerViewProps> = (props) => {
  const { data, id, mode } = props

  const setChosenTaskID = useChosenTask((state) => state.setChosenTaskID)
  const openModal = useModal((state) => state.openModal)
  const isOneDifficultyLevel = useChosenTask((state) => state.isOneDifficultyLevel)

  const onEdit = () => {
    setChosenTaskID(id)
    openModal()
  }

  return (
    <div className={s.wrapper}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <div className={s.title}>{data?.title}</div>
        </div>
        {!isOneDifficultyLevel && (
          <div className={s.difficultyLevel}>
            <span className={s.subtitle}>Рівень складності поточного завдання</span>
            <div className={s.difficultyLevelItems}>
              <span className={s.active}>Легкий</span>
              <span>Середній</span>
              <span>Складний</span>
            </div>
          </div>
        )}
      </div>
      <div className={s.subtitle}>{data?.description}</div>
      <div className="view">
        <div
          className={s.title}
          dangerouslySetInnerHTML={{ __html: data?.taskText[0].taskQuestion || '' }}
        />
        <div className={s.answerBlockWrapper}>
          {data?.taskText[0].taskAnswers.map((item) => (
            <div className={s.answerGroupWrapper} key={item.id}>
              {item.answers.map(
                (subitem) =>
                  subitem.value && (
                    <Button type="default" shape="round" key={subitem.id}>
                      {subitem.value}
                    </Button>
                  ),
              )}
            </div>
          ))}
        </div>
      </div>
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
