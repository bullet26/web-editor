/* eslint-disable import/no-extraneous-dependencies */
import { CSSProperties, FC, Ref } from 'react'
import { Input as AntInput, InputRef } from 'antd'
import { useField } from 'formik'
import s from './FormElements.module.scss'

interface InputProps {
  name: string
  placeholder?: string
  type?: 'input' | 'textarea'
  style?: CSSProperties
  refProp?: Ref<InputRef>
  className?: string
  textareaRows?: number
  resize?: boolean
  autoSize?: boolean
}

export const Input: FC<InputProps> = (props) => {
  const {
    name,
    placeholder,
    type = 'input',
    style = {},
    refProp,
    className,
    textareaRows = 4,
    resize = false,
    autoSize,
  } = props
  const [field, meta, helpers] = useField(name)

  const { TextArea } = AntInput
  const isTextAreaResize = resize ? 'vertical' : 'none'

  return (
    <div>
      {type === 'input' && (
        <>
          <AntInput
            placeholder={placeholder}
            id={name}
            name={name}
            type="text"
            value={field.value}
            onChange={(e) => helpers.setValue(e?.target.value, true)}
            style={style}
            ref={refProp}
            className={className}
          />

          {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
        </>
      )}
      {type === 'textarea' && (
        <>
          <TextArea
            placeholder={placeholder}
            id={name}
            name={name}
            value={field.value}
            onChange={(e) => helpers.setValue(e?.target.value, true)}
            rows={textareaRows}
            style={{ ...style, resize: isTextAreaResize }}
            autoSize={autoSize}
            ref={refProp}
            className={className}
          />

          {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
        </>
      )}
    </div>
  )
}
