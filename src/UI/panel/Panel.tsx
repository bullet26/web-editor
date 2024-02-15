/* eslint-disable consistent-return */
import { Drawer } from 'antd'
import { useModal } from 'store'
import { MainTab } from './tabs'

export const Panel = () => {
  const isPanelOpen = useModal((state) => state.isPanelOpen)
  const closePanel = useModal((state) => state.closePanel)

  return (
    <Drawer
      placement="top"
      title="Додати блок"
      onClose={closePanel}
      open={isPanelOpen}
      height="90vh"
      styles={{ body: { paddingTop: 0 } }}>
      <MainTab />
    </Drawer>
  )
}
