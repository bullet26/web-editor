/* eslint-disable react/no-danger */
import { FC, Fragment } from 'react'
import { Button } from 'antd'
import { useBlocks } from 'store'
import { TaskView } from 'components'
import s from './ViewModeContent.module.scss'

interface ViewModeContentProps {
  onEditClick: () => void
}
export const ViewModeContent: FC<ViewModeContentProps> = (props) => {
  const { onEditClick } = props

  const getBlocksInCurrentChapter = useBlocks((state) => state.getBlocksInCurrentChapter)

  const IS_TASK_TYPES = (type: string) =>
    type === 'rightAnswerTask' ||
    type === 'answerFromSelect' ||
    type === 'orderSplitSentence' ||
    type === 'compareTask' ||
    type === 'categorizeTask' ||
    type === 'sortDialogue' ||
    type === 'trueOrFalseTask' ||
    type === 'typeAnswerTask' ||
    type === 'correctMistakesTask' ||
    type === 'onlyOneOrTwoRightAnswerTask'

  return (
    <div className={s.wrapper}>
      <div className={s.buttonGroup}>
        <Button type="primary" shape="round" onClick={onEditClick}>
          Редагувати
        </Button>
      </div>
      {getBlocksInCurrentChapter().map(
        ({ text = '', type, id, url, taskData, imageCaption, tableColumns }) => (
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
            {IS_TASK_TYPES(type) && <TaskView data={taskData} mode="view" type={type} />}
          </Fragment>
        ),
      )}
    </div>
  )
}
