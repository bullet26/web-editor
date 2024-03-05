/* eslint-disable react/no-danger */
import { FC } from 'react'
import { RightAnswerTask } from 'types'
import s from '../../TaskView.module.scss'

interface TypeAnswerViewProps {
  data: RightAnswerTask | null
}

export const TypeAnswerView: FC<TypeAnswerViewProps> = (props) => {
  const { data } = props
  const idMatches = data?.taskText[0].taskQuestion.match(/data-skip="([^"]+)"/g)
  const ids = idMatches ? idMatches.map((item) => item.match(/data-skip="([^"]+)"/)?.at(1)) : []

  const inputElements = ids.map((id) => {
    if (!id) {
      return ''
    }

    return `<input type="text" name="answer" maxlength="100"  oninput="this.size = this.value.length" />`
  })
  const updatedHtmlString = data?.taskText[0].taskQuestion.replace(
    /<span class="rectangle"><\/span>/g,
    () => inputElements.shift() || '<input/>',
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
