import { FC } from 'react'
import { Tabs } from 'antd'
import { useField } from 'formik'
import type { TabsProps } from 'antd'
import s from './FormElements.module.scss'

export const DifficultyLevelTab: FC = () => {
  const fieldName = 'difficultyLevel'
  const [field, meta, helpers] = useField(fieldName)

  const items: TabsProps['items'] = [
    {
      key: 'easy',
      label: 'Легкий',
    },
    {
      key: 'middle',
      label: 'Середній',
    },
    {
      key: 'hard',
      label: 'Складний',
    },
  ]

  return (
    <div>
      <span className={s.label}>Рівень складності поточного завдання</span>
      <Tabs
        defaultActiveKey="1"
        activeKey={field.value}
        items={items}
        tabBarStyle={{ color: 'black' }}
        onChange={(key: string) => helpers.setValue(key, true)}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </div>
  )
}
