/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { useChosenTask } from 'store'
import { TaskType, Type } from 'types'
import { RightAnswerTaskView } from './right-answer-task-view'
import { AnswerFromSelectView } from './answer-from-select-task-view'
import s from './TaskView.module.scss'

interface TaskViewProps {
  data?: TaskType
  type: Type
  mode: 'edit' | 'view'
}

export const TaskView: FC<TaskViewProps> = (props) => {
  const { data, mode, type } = props

  const isOneDifficultyLevel = useChosenTask((state) => state.isOneDifficultyLevel)

  return (
    <div className={s.wrapper}>
      <div className={s.outerWrapper}>
        <div className={s.innerWrapper}>
          <div className={s.title}>
            <span className={s.titleBlue}>Завдання:</span>
            <span> {data?.title}</span>
          </div>
          <div className={s.subtitle}>{data?.description}</div>
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
      {type === 'rightAnswerTask' && <RightAnswerTaskView data={data} />}
      {type === 'answerFromSelect' && <AnswerFromSelectView data={data} />}
      <Button type="primary" shape="round" disabled={mode === 'edit'} style={{ width: '100%' }}>
        Перевірити
      </Button>
    </div>
  )
}
