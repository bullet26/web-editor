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

export const updateCircleNumber = (fieldValue: string) => {
  let i = 1

  const questionValue = fieldValue.replace(
    /<span class="circle">.*?<\/span>/g,
    () => `<span class="circle">${i++}</span>`,
  )

  return questionValue
}

export const addSkip = (
  event: MouseEvent<HTMLElement>,
  inputRef: RefObject<HTMLElement>,
  prevStateFieldValue: RightAnswerTaskAnswer[],
  skipType: 'rectangle' | 'line',
) => {
  event.preventDefault() // fix for move cursor in the end

  const id = generateId()
  const number = (inputRef.current?.querySelectorAll('div').length || 0) + 1

  let skipItem
  const skipItemLine = `&nbsp;<div contentEditable=false class="skip" data-skip="${id}"><span class="circle">${number}</span><span class="line"></span></div>&nbsp;`
  const skipItemRectangle = `&nbsp;<div contentEditable=false class="skip" data-skip="${id}"><span class="circle">${number}</span><span class="rectangle"></span></div>&nbsp;`

  if (skipType === 'rectangle') {
    skipItem = skipItemRectangle
  } else if (skipType === 'line') {
    skipItem = skipItemLine
  }

  if (!inputRef.current) {
    return { answerValue: prevStateFieldValue, questionValue: '' }
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

  const answerValue = sortAnswers(inputRef, [...prevStateFieldValue, currentValue])
  const questionValue = updateCircleNumber(inputRef.current?.innerHTML)
  return { answerValue, questionValue }
}

export const deleteSkipCheck = (
  inputRef: RefObject<HTMLElement>,
  answerBlockValue: RightAnswerTaskAnswer[],
) => {
  const idMatches = inputRef.current?.innerHTML?.match(/data-skip="([^"]+)"/g)
  const skipOrder = idMatches
    ? idMatches.map((item) => item.match(/data-skip="([^"]+)"/)?.at(1))
    : []

  if (skipOrder.length === answerBlockValue.length || !inputRef.current) {
    return { answerValue: answerBlockValue, questionValue: inputRef.current?.innerHTML }
  }
  if (skipOrder.length < answerBlockValue.length) {
    const answerValue = answerBlockValue.filter((item) => skipOrder.includes(item.id))
    const questionValue = updateCircleNumber(inputRef.current.innerHTML)
    return { answerValue, questionValue }
  }
  console.log('deleteSkipCheck', skipOrder, answerBlockValue)
  return { answerValue: answerBlockValue, questionValue: inputRef.current?.innerHTML }
}
