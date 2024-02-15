import { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { InfoTab } from './InfoTab'
import { TasksTab } from './TasksTab'
import { ServiceTab } from './ServiceTab'

export const TemplatesTab: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: 'Інформаційнi',
      children: <InfoTab />,
    },
    {
      key: 'tasks',
      label: 'Завдання',
      children: <TasksTab />,
    },
    {
      key: 'service',
      label: 'Службові',
      children: <ServiceTab />,
    },
  ]

  return (
    <div className="templatesTab">
      <Tabs defaultActiveKey="1" items={items} tabBarStyle={{ color: 'black' }} />
    </div>
  )
}
