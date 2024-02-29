import { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { WarningIcon } from 'assets'
import { useFormContext } from '../../utils'
import s from './FormElements.module.scss'

interface DifficultyLevelTabProps {
  childrenOption: ReactNode
  easyLevelWarningCondition: boolean
  middleLevelWarningCondition: boolean
  hardLevelWarningCondition: boolean
}

export const DifficultyLevelTab: FC<DifficultyLevelTabProps> = (props) => {
  const {
    childrenOption,
    easyLevelWarningCondition,
    middleLevelWarningCondition,
    hardLevelWarningCondition,
  } = props
  const { difficultyLevel, setDifficultyLevel } = useFormContext()

  const items: TabsProps['items'] = [
    {
      key: 'easy',
      label: (
        <div className={s.tabWrapper}>
          <span>Легкий</span>
          {easyLevelWarningCondition && <WarningIcon />}
        </div>
      ),
      children: childrenOption,
    },
    {
      key: 'middle',
      label: (
        <div className={s.tabWrapper}>
          <span>Середній</span>
          {middleLevelWarningCondition && <WarningIcon />}
        </div>
      ),
      children: childrenOption,
    },
    {
      key: 'hard',
      label: (
        <div className={s.tabWrapper}>
          <span>Складний</span>
          {hardLevelWarningCondition && <WarningIcon />}
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
