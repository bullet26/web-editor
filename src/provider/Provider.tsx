/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, FC } from 'react'
import { ConfigProvider } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeConfig } from 'theme/createTheme'
import { BubbleStateManager } from './BubbleStateManager'

export const BubbleContext = createContext({} as BubbleStateManager)

export const Providers = <T,>({
  children,
  stateManager,
}: {
  children: ReactNode
  stateManager: BubbleStateManager<T>
}) => {
  return (
    <ConfigProvider theme={ThemeConfig}>
      <DndProvider backend={HTML5Backend}>
        <BubbleContext.Provider value={stateManager}>{children}</BubbleContext.Provider>
      </DndProvider>
    </ConfigProvider>
  )
}
