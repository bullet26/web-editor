import { FC } from 'react'
import { useField } from 'formik'
import { Checkbox } from 'antd'
import type { GetProp } from 'antd'
import s from './FormElements.module.scss'

export const CheckboxGroup: FC = () => {
  const fieldName = 'parameters'

  const [field, meta, helpers] = useField(fieldName)

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    helpers.setValue(checkedValues)
  }

  const options = [
    { label: 'З перевіркою', value: 'withCheck' },
    { label: 'Пройти знову', value: 'passAgain' },
    { label: 'Випадкове розміщення', value: 'randomPlacement' },
    { label: 'Один рівень складності', value: 'oneDifficultyLevel' },
  ]

  return (
    <div>
      <div className={s.title}>Параметри завдання</div>
      <Checkbox.Group
        options={options}
        value={field.value}
        onChange={onChange}
        className={s.checkboxGroup}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}
