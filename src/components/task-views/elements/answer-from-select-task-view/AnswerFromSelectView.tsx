/* eslint-disable react/no-danger */
import { FC } from 'react'
import { RightAnswerTask } from 'types'
import s from '../../TaskView.module.scss'

interface AnswerFromSelectViewProps {
  data: RightAnswerTask | null
}

export const AnswerFromSelectView: FC<AnswerFromSelectViewProps> = (props) => {
  const { data } = props

  const idMatches = data?.taskText[0].taskQuestion.match(/data-skip="([^"]+)"/g)
  const ids = idMatches ? idMatches.map((item) => item.match(/data-skip="([^"]+)"/)?.at(1)) : []

  const selectElements = ids.map((id) => {
    if (!id) {
      return ''
    }
    const options = data?.taskText[0].taskAnswers.find((item) => item.id === id)?.answers

    const optionsForSelect =
      options?.map(({ value }) => value && `<option>${value}</option>`) || `<option></option>`
    return `<select><option value disabled selected></option>${optionsForSelect}</select>`
  })
  const updatedHtmlString = data?.taskText[0].taskQuestion.replace(
    /<span class="rectangle"><\/span>/g,
    () => selectElements.shift() || '<select></select>',
  )

  return (
    <div className="view">
      <div
        className={s.taskTextAloneBlock}
        dangerouslySetInnerHTML={{ __html: updatedHtmlString || '' }}
      />
    </div>
  )
}
