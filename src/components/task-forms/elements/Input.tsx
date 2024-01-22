/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react'
import { Input as AntInput } from 'antd'
import { useField } from 'formik'
import s from './FormElements.module.scss'

interface InputProps {
  name: string
  placeholder?: string
  type?: 'input' | 'textarea'
  style?: object
}

export const Input: FC<InputProps> = (props) => {
  const { name, placeholder, type = 'input', style = {} } = props
  const [field, meta, helpers] = useField(name)

  const { TextArea } = AntInput

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
            rows={4}
            style={{ ...style, resize: 'none' }}
          />

          {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
        </>
      )}
    </div>
  )
}
