import { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { TemplatesTab } from '../template-tab/TemplatesTab'

export const MainTab: FC = () => {
  const items: TabsProps['items'] = [
    {
      key: 'template',
      label: 'Шаблони',
      children: <TemplatesTab />,
    },
    {
      key: 'library',
      label: 'Бібліотека',
      children: <div>Бібліотека</div>,
    },
  ]

  return (
    <div className="mainTab">
      <Tabs defaultActiveKey="template" items={items} tabBarStyle={{ color: 'black' }} />
    </div>
  )
}
