import { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useField } from 'formik'
import { WarningIcon } from 'assets'
import { useFormContext } from '../utils'
import s from './FormElements.module.scss'

interface DifficultyLevelTabProps {
  childrenOption: ReactNode
  easyLevelValueSelector: string
  middleLevelValueSelector: string
  hardLevelValueSelector: string
}

export const DifficultyLevelTab: FC<DifficultyLevelTabProps> = (props) => {
  const {
    childrenOption,
    easyLevelValueSelector,
    middleLevelValueSelector,
    hardLevelValueSelector,
  } = props
  const { difficultyLevel, setDifficultyLevel } = useFormContext()

  const [fieldEasy] = useField(easyLevelValueSelector)
  const [fieldMiddle] = useField(middleLevelValueSelector)
  const [fieldHard] = useField(hardLevelValueSelector)

  const items: TabsProps['items'] = [
    {
      key: 'easy',
      label: (
        <div className={s.tabWrapper}>
          <span>Легкий</span>
          {(!fieldEasy.value || fieldEasy.value.length < 10) && <WarningIcon />}
        </div>
      ),
      children: childrenOption,
    },
    {
      key: 'middle',
      label: (
        <div className={s.tabWrapper}>
          <span>Середній</span>
          {(!fieldMiddle.value || fieldMiddle.value.length < 10) && <WarningIcon />}
        </div>
      ),
      children: childrenOption,
    },
    {
      key: 'hard',
      label: (
        <div className={s.tabWrapper}>
          <span>Складний</span>
          {(!fieldHard.value || fieldHard.value.length < 10) && <WarningIcon />}
        </div>
      ),
      children: childrenOption,
    },
  ]

  const onChange = (key: string) => {
    if (key === 'easy' || key === 'middle' || key === 'hard') {
      setDifficultyLevel(key)
    } else {
      console.log(key, 'difficultyLevel')
    }
  }

  return (
    <div className="difficultyLevel">
      <div className={s.label}>Рівень складності поточного завдання</div>
      <Tabs
        defaultActiveKey="1"
        activeKey={difficultyLevel}
        items={items}
        tabBarStyle={{ color: 'black' }}
        onChange={(key: string) => onChange(key)}
      />
    </div>
  )
}
