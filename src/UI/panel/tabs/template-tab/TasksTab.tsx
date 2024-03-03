import { FC } from 'react'
import { Card } from 'antd'
import { useChosenTask, useModal } from 'store'
import { types, Type } from 'types'
import {
  rightAnswerBlockIcon,
  answerFromSelectBlockIcon,
  orderSplitSentenceBlocIcon,
  compareBlocIcon,
  categorizeBlocIcon,
  sortDialogueBlocIcon,
  trueOrFalseTaskBlocIcon,
} from 'assets'
import s from './TemplatesTab.module.scss'

export const TasksTab: FC = () => {
  const setChosenTaskID = useChosenTask((state) => state.setChosenTaskID)
  const setChosenTaskType = useChosenTask((state) => state.setChosenTaskType)
  const openModal = useModal((state) => state.openModal)
  const closePanel = useModal((state) => state.closePanel)

  const clickCard = (taskType: Type) => {
    if (!types.includes(taskType)) {
      console.log('clickCard', 'unlnown type', taskType)
    }
    closePanel()
    setChosenTaskType(taskType)
    setChosenTaskID(null)
    openModal()
  }
  return (
    <div className={s.tabItemWrapper}>
      <Card
        title="Правильна відповідь"
        className={s.card}
        onClick={() => {
          clickCard('rightAnswerTask')
        }}>
        <div className={s.cardBody}>
          <img src={rightAnswerBlockIcon} alt="rightAnswerBlockIcon" />
        </div>
      </Card>
      <Card
        title="Варіант зі списку в тексті"
        className={s.card}
        onClick={() => {
          clickCard('answerFromSelect')
        }}>
        <div className={s.cardBody}>
          <img src={answerFromSelectBlockIcon} alt="answerFromSelectBlockIcon" />
        </div>
      </Card>
      <Card
        title="Співвідносити"
        className={s.card}
        onClick={() => {
          clickCard('compareTask')
        }}>
        <div className={s.cardBody}>
          <img src={compareBlocIcon} alt="compareBlocIcon" />
        </div>
      </Card>
      <Card
        title="Розставити слова у правильному порядку"
        className={s.card}
        onClick={() => {
          clickCard('orderSplitSentence')
        }}>
        <div className={s.cardBody}>
          <img src={orderSplitSentenceBlocIcon} alt="orderSplitSentenceBlocIcon" />
        </div>
      </Card>
      <Card
        title="Розставити фрази у діалозі"
        className={s.card}
        onClick={() => {
          clickCard('sortDialogue')
        }}>
        <div className={s.cardBody}>
          <img src={sortDialogueBlocIcon} alt="sortDialogueBlocIcon" />
        </div>
      </Card>
      <Card
        title="Категорувати"
        className={s.card}
        onClick={() => {
          clickCard('categorizeTask')
        }}>
        <div className={s.cardBody}>
          <img src={categorizeBlocIcon} alt="categorizeBlocIcon" />
        </div>
      </Card>
      <Card
        title="Правда / Неправда"
        className={s.card}
        onClick={() => {
          clickCard('trueOrFalseTask')
        }}>
        <div className={s.cardBody}>
          <img src={trueOrFalseTaskBlocIcon} alt="trueOrFalseTaskBlocIcon" />
        </div>
      </Card>
    </div>
  )
}
