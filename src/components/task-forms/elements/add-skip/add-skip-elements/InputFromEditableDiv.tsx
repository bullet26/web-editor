/* eslint-disable import/no-extraneous-dependencies */
import { FC, RefObject } from 'react'
import { useField } from 'formik'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import s from '../AddSkip.module.scss'

interface InputProps {
  name: string
  style?: object
  placeholder?: string
  innerRef: RefObject<HTMLElement>
  additionalOnChangeFunc?: () => void
}

export const InputFromEditableDiv: FC<InputProps> = (props) => {
  const { style, name, placeholder, innerRef, additionalOnChangeFunc } = props
  const [field, meta, helpers] = useField(name)

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target
    helpers.setValue(value, true)

    const inputType = (e.nativeEvent as any)?.inputType
    if (
      (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') &&
      !!additionalOnChangeFunc
    ) {
      additionalOnChangeFunc()
    }
  }

  return (
    <>
      <ContentEditable
        tagName="pre"
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
