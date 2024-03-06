/* eslint-disable consistent-return */
import { RefObject } from 'react'
import { RightAnswerTaskAnswer, RightAnswerTaskItem } from 'types'
import { generateId } from 'utils'

export const sortAnswers = (inputRef: RefObject<HTMLElement>, arr: RightAnswerTaskAnswer[]) => {
  const idMatches = inputRef.current?.innerHTML?.match(/data-skip="([^"]+)"/g)
  const skipOrder = idMatches
    ? idMatches.map((item) => item.match(/data-skip="([^"]+)"/)?.at(1))
    : []

  return skipOrder.map((item) => arr.find((subitem) => subitem.id === item))
}

export const moveCursorToEnd = (ContentEditableRef: RefObject<HTMLElement>) => {
  if (!ContentEditableRef.current) {
    return
  }
  const range = document.createRange()
  const selection = window.getSelection()
  range.setStart(ContentEditableRef.current, ContentEditableRef.current.childNodes.length)
  range.collapse(true)
  selection?.removeAllRanges()
  selection?.addRange(range)
}

export const getCursorPosition = (ContentEditableRef: RefObject<HTMLElement>) => {
  if (!ContentEditableRef.current) {
    return
  }
  const selection = window.getSelection()

  if (!selection?.focusNode) {
    return null
  }

  const range = selection.getRangeAt(0)
  const clonedRange = range.cloneRange()
  clonedRange?.selectNodeContents(ContentEditableRef.current)
  clonedRange?.setEnd(range.endContainer, range.endOffset)

  return clonedRange.toString().length
}

export const deleteAnswerOrGroupAnswers = (
  fieldValueS: RightAnswerTaskAnswer[],
  groupId: string,
  itemId: string,
  deleteAnswersInTwoGroups: boolean,
) => {
  if (deleteAnswersInTwoGroups && fieldValueS.length === 2) {
    let deletedIndex: number | null = null
    fieldValueS.forEach((item: RightAnswerTaskAnswer) => {
      if (item.id === groupId) {
        deletedIndex = item?.answers.findIndex(
          (subitem: RightAnswerTaskItem) => subitem.id === itemId,
        )
      }
    })
    return fieldValueS.map((item: RightAnswerTaskAnswer) => {
      return {
        ...item,
        answers: deletedIndex ? item?.answers.toSpliced(deletedIndex, 1) : item?.answers,
      }
    })
  }
  return fieldValueS.map((item: RightAnswerTaskAnswer) => {
    if (item.id === groupId) {
      return {
        ...item,
        answers: item?.answers.filter((subitem: RightAnswerTaskItem) => subitem.id !== itemId),
      }
    }
    return item
  })
}

export const addAnswerOrGroupAnswers = (
  fieldValueS: RightAnswerTaskAnswer[],
  groupId: string,
  type: 'correct' | 'incorrect',
  createAnswersInTwoGroups: boolean,
) => {
  const currentValue: RightAnswerTaskItem = {
    type,
    id: generateId(),
    value: '',
  }

  if (createAnswersInTwoGroups) {
    return fieldValueS.map((item: RightAnswerTaskAnswer) => {
      return { ...item, answers: [...item.answers, currentValue] }
    })
  }
  return fieldValueS.map((item: RightAnswerTaskAnswer) => {
    if (item.id === groupId) {
      return { ...item, answers: [...item.answers, currentValue] }
    }
    return item
  })
}
