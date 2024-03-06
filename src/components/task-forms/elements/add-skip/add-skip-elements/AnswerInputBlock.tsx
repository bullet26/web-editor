/* eslint-disable import/no-extraneous-dependencies */
import { FC, RefObject } from 'react'
import { useField } from 'formik'
import { Button } from 'antd'
import classNames from 'classnames'
import { DeleteIcon } from 'assets'
import { RightAnswerTaskAnswer } from 'types'
import { updateCircleNumber } from '../utils'
import { AnswerInput } from './AnswerInput'
import { AlwaysCorrectAnswerInput } from './AlwaysCorrectAnswerInput'
import { OnlyOneOrTwoAnswerInput } from './OnlyOneOrTwoAnswer'
import s from '../AddSkip.module.scss'
import { addAnswerOrGroupAnswers, deleteAnswerOrGroupAnswers } from './utils'

interface AnswerInputBlockProps {
  inputName: string
  answerBlockName: string
  inputRef: RefObject<HTMLElement>
  onlyCorrectAnswer: boolean
  onlyOneOrTwoAnswer: boolean
}

export const AnswerInputBlock: FC<AnswerInputBlockProps> = (props) => {
  const { inputName, answerBlockName, inputRef, onlyCorrectAnswer, onlyOneOrTwoAnswer } = props

  const [fieldAnswer, , helpersAnswer] = useField(answerBlockName)
  const [fieldTaskQuestion, , helpersTaskQuestion] = useField(inputName)

  const onChangeAnswer = (groupId: string, itemId: string, value: string) => {
    const fieldValueS = fieldAnswer.value.map((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        const answers = item.answers.map((subitem) => {
          if (subitem.id === itemId) {
            return { ...subitem, value }
          }
          return subitem
        })
        return { ...item, answers }
      }
      return item
    })

    helpersAnswer.setValue(fieldValueS, true)
  }

  const addAnswerItem = (groupId: string) => {
    const type = onlyCorrectAnswer ? 'correct' : 'incorrect'
    const createAnswersInTwoGroups = onlyOneOrTwoAnswer
    const fieldValueS = addAnswerOrGroupAnswers(
      fieldAnswer.value,
      groupId,
      type,
      createAnswersInTwoGroups,
    )

    helpersAnswer.setValue(fieldValueS, true)
  }

  const onDeleteSkipGroup = (id: string) => {
    if (inputRef.current) {
      const regex = new RegExp(`&nbsp;<div[^>]*data-skip="${id}"[^>]*>.*?<\\/div>&nbsp;`, 'g')
      const fieldValueWithoutDeletedItem = fieldTaskQuestion.value.replace(regex, '')
      const updatedFieldValue = updateCircleNumber(fieldValueWithoutDeletedItem)

      helpersTaskQuestion.setValue(updatedFieldValue, true)
    }

    const fieldValueS = fieldAnswer.value.filter((item: RightAnswerTaskAnswer) => item.id !== id)
    helpersAnswer.setValue(fieldValueS, true)
  }

  const onDeleteAnswerItem = (groupId: string, itemId: string) => {
    const deleteAnswersInTwoGroups = onlyOneOrTwoAnswer
    const fieldValueS = deleteAnswerOrGroupAnswers(
      fieldAnswer.value,
      groupId,
      itemId,
      deleteAnswersInTwoGroups,
    )
    helpersAnswer.setValue(fieldValueS, true)
  }

  return (
    <div
      className={classNames({
        [s.answerBlockWrapper]: !onlyOneOrTwoAnswer,
        [s.onlyOneAnswerBlockWrapper]: onlyOneOrTwoAnswer,
      })}>
      {fieldAnswer.value.map((item: RightAnswerTaskAnswer, i: number) => (
        <div
          className={classNames({
            [s.answerGroupWrapper]: !onlyOneOrTwoAnswer,
            [s.onlyOneAnswerGroupWrapper]: onlyOneOrTwoAnswer,
          })}
          key={item.id}>
          {!onlyOneOrTwoAnswer && (
            <div className={s.answerGroupIconWrapper}>
              <div className="circleSmall">{i + 1}</div>
              <DeleteIcon fill="#EC2028" onClick={() => onDeleteSkipGroup(item.id)} />
            </div>
          )}
          {onlyCorrectAnswer &&
            item.answers.map((subitem, number) => (
              <AlwaysCorrectAnswerInput
                groupId={item.id}
                itemId={subitem.id}
                {...subitem}
                number={number + 1}
                onChange={onChangeAnswer}
                key={subitem.id}
                onDelete={onDeleteAnswerItem}
              />
            ))}
          {onlyOneOrTwoAnswer &&
            item.answers.map((subitem, number) => (
              <OnlyOneOrTwoAnswerInput
                groupNumber={i + 1}
                elementNumber={number + 1}
                elemQuant={item.answers.length}
                groupQuant={fieldAnswer.value.length}
                key={subitem.id}
                groupId={item.id}
                itemId={subitem.id}
                {...subitem}
                onChange={onChangeAnswer}
                onDeleteItem={onDeleteAnswerItem}
                onDeleteGroup={onDeleteSkipGroup}
                addAnswerItem={addAnswerItem}
              />
            ))}
          {!onlyCorrectAnswer &&
            !onlyOneOrTwoAnswer &&
            item.answers.map((subitem) => (
              <AnswerInput
                groupId={item.id}
                itemId={subitem.id}
                {...subitem}
                onChange={onChangeAnswer}
                key={subitem.id}
                onDelete={onDeleteAnswerItem}
              />
            ))}

          {!onlyOneOrTwoAnswer && item.answers.length < 5 && (
            <Button
              shape="circle"
              type="default"
              className="blueBtn"
              style={{ width: '32px' }}
              onClick={() => addAnswerItem(item.id)}>
              +
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
