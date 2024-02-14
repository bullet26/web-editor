import { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useChosenTask } from 'store'
import s from './FormElements.module.scss'

interface DifficultyLevelTabProps {
  childrenOption: ReactNode
}

export const DifficultyLevelTab: FC<DifficultyLevelTabProps> = (props) => {
  const { childrenOption } = props
  const difficultyLevel = useChosenTask((state) => state.difficultyLevel)
  const setDifficultyLevel = useChosenTask((state) => state.setDifficultyLevel)

  const items: TabsProps['items'] = [
    {
      key: 'easy',
      label: 'Легкий',
      children: childrenOption,
    },
    {
      key: 'middle',
      label: 'Середній',
      children: childrenOption,
    },
    {
      key: 'hard',
      label: 'Складний',
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
    <>
      <div className={s.label}>Рівень складності поточного завдання</div>
      <Tabs
        defaultActiveKey="1"
        activeKey={difficultyLevel}
        items={items}
        tabBarStyle={{ color: 'black' }}
        onChange={(key: string) => onChange(key)}
      />
    </>
  )
}
