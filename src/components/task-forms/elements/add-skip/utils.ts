/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { MouseEvent, RefObject } from 'react'
import { RightAnswerTaskAnswer } from 'types'
import { generateId } from 'utils'
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
  skipType: 'rectangle' | 'line',
) => {
  event.preventDefault() // fix for move cursor in the end

  const id = generateId()

  let skipItem
  const skipItemLine = `&nbsp;<div contentEditable=false class="skip" data-skip="${id}"><span class="circle">1</span><span class="line"></span></div>&nbsp;`
  const skipItemRectangle = `&nbsp;<div contentEditable=false class="skip" data-skip="${id}"><span class="circle">1</span><span class="rectangle"></span></div>&nbsp;`

  if (skipType === 'rectangle') {
    skipItem = skipItemRectangle
  } else if (skipType === 'line') {
    skipItem = skipItemLine
  }

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
    ?.querySelectorAll('div')
    .forEach((item) => !!item.dataset.skip && skipOrder.push(item.dataset.skip))

  if (skipOrder.length === answerBlockValue.length) {
    return
  }
  if (skipOrder.length < answerBlockValue.length) {
    return answerBlockValue.filter((item) => skipOrder.includes(item.id))
  }
  console.log('deleteSkipCheck', skipOrder, answerBlockValue)
}
