/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { MouseEvent, RefObject } from 'react'
import { RightAnswerTaskAnswer } from 'types'
import { generateId, generateRandomColor } from 'utils'
import { moveCursorToEnd, getCursorPosition, sortAnswers } from './add-skip-elements/utils'

export const emptyMidAndHardTab = [
  {
    difficultyLevel: 'middle',
    taskQuestion: '&nbsp;',
    taskAnswers: [],
  },
  {
    difficultyLevel: 'hard',
    taskQuestion: '&nbsp;',
    taskAnswers: [],
  },
]

export const addSkip = (
  event: MouseEvent<HTMLElement>,
  inputRef: RefObject<HTMLElement>,
  prevStateFieldValue: RightAnswerTaskAnswer[],
) => {
  event.preventDefault() // fix for move cursor in the end

  const id = generateId()
  const color = generateRandomColor()

  const skipItem = `<span contentEditable=false class="skip" style="border-bottom-color: ${color}" data-skip="${id}"></span>&nbsp;`

  if (!inputRef.current) {
    return
  }

  inputRef.current.focus()
  if (!getCursorPosition(inputRef)) {
    moveCursorToEnd(inputRef)
  }

  document.execCommand('insertHTML', false, skipItem)

  const currentValue: RightAnswerTaskAnswer = {
    id,
    answers: [
      {
        id: generateId(),
        type: 'correct',
        value: '',
        color,
      },
    ],
  }

  return sortAnswers(inputRef, [...prevStateFieldValue, currentValue])
}

export const deleteSkipCheck = (
  inputRef: RefObject<HTMLElement>,
  answerBlockValue: RightAnswerTaskAnswer[],
) => {
  const skipOrder: string[] = []
  inputRef.current
    ?.querySelectorAll('span')
    .forEach((item) => !!item.dataset.skip && skipOrder.push(item.dataset.skip))

  if (skipOrder.length === answerBlockValue.length) {
    return
  }
  if (skipOrder.length < answerBlockValue.length) {
    return answerBlockValue.filter((item) => skipOrder.includes(item.id))
  }
  console.log('deleteSkipCheck', skipOrder, answerBlockValue)
}
