/* eslint-disable react/no-danger */
import { FC } from 'react'
import { Button } from 'antd'
import { TaskType, Type } from 'types'
import {
  AnswerFromSelectView,
  CompareTaskView,
  CorrectOrderSplitSentenceView,
  RightAnswerTaskView,
  CategorizeTaskView,
} from './elements'
import { isRightAnswerTask, isCompareTask, isSplitSentenceTask, isCategorizeTask } from './utils'
import s from './TaskView.module.scss'

interface TaskViewProps {
  data?: TaskType
  type: Type
  mode: 'edit' | 'view'
}

export const TaskView: FC<TaskViewProps> = (props) => {
  const { data, mode, type } = props

  const isOneDifficultyLevel = data?.parameters.includes('oneDifficultyLevel')

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
      {type === 'rightAnswerTask' && (
        <RightAnswerTaskView data={isRightAnswerTask(data) ? data : null} />
      )}
      {type === 'answerFromSelect' && (
        <AnswerFromSelectView data={isRightAnswerTask(data) ? data : null} />
      )}
      {type === 'orderSplitSentence' && (
        <CorrectOrderSplitSentenceView data={isSplitSentenceTask(data) ? data : null} />
      )}
      {type === 'compareTask' && <CompareTaskView data={isCompareTask(data) ? data : null} />}
      {type === 'categorizeTask' && (
        <CategorizeTaskView data={isCategorizeTask(data) ? data : null} />
      )}

      <Button type="primary" shape="round" disabled={mode === 'edit'} style={{ width: '100%' }}>
        Перевірити
      </Button>
    </div>
  )
}
