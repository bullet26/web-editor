/* eslint-disable consistent-return */
import { RefObject } from 'react'
import { RightAnswerTaskAnswer } from 'types'

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
