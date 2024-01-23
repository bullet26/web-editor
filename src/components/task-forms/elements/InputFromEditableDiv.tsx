/* eslint-disable import/no-extraneous-dependencies */
import { FC, useRef, useEffect } from 'react'
import { useField } from 'formik'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import s from './FormElements.module.scss'

interface InputProps {
  name: string
  style?: object
  placeholder?: string
}

export const InputFromEditableDiv: FC<InputProps> = (props) => {
  const { style, name, placeholder } = props
  const [field, meta, helpers] = useField(name)
  const inputRef = useRef(null)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    helpers.setValue(value, true)
  }

  // https://stackoverflow.com/questions/69956977/html-contenteditable-keep-caret-position-when-inner-html-changes
  // https://codepen.io/feketegy/pen/RwGBgyq

  return (
    <>
      <ContentEditable
        html={field.value}
        className={s.inputDiv}
        data-placeholder={placeholder}
        style={style}
        onChange={onChange}
        innerRef={inputRef}
      />

      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </>
  )
}
