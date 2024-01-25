/* eslint-disable import/no-extraneous-dependencies */
import { FC, RefObject } from 'react'
import { useField } from 'formik'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import s from '../RAElements.module.scss'

interface InputProps {
  name: string
  style?: object
  placeholder?: string
  innerRef: RefObject<HTMLElement>
}

export const InputFromEditableDiv: FC<InputProps> = (props) => {
  const { style, name, placeholder, innerRef } = props
  const [field, meta, helpers] = useField(name)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    helpers.setValue(value, true)
  }

  return (
    <>
      <ContentEditable
        html={field.value}
        className={s.inputDiv}
        data-placeholder={placeholder}
        style={style}
        onChange={onChange}
        innerRef={innerRef}
      />

      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </>
  )
}
