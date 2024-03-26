import ReactDOM from 'react-dom/client'
import { Providers, BubbleStateManager } from 'provider'
import { App } from './App'
import './index.scss'

const mode = import.meta.env.VITE_MODE

const initState = {
  value: 'initial value',
  apiKey: import.meta.env.VITE_TOKEN,
  role: '',
  versionId: '5e3b9091-03bc-416a-b754-ca6a7a89f749',
}
export type ComponentStateType = typeof initState

declare global {
  interface Window {
    initPlugin: (id: string) => BubbleStateManager
  }
}
const stateManager = new BubbleStateManager(initState)

if (mode === 'production') {
  window.initPlugin = (id: string) => {
    const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement)
    root.render(
      <Providers stateManager={stateManager}>
        <App />
      </Providers>,
    )
    return stateManager
  }
}

if (mode === 'develop') {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Providers stateManager={stateManager}>
      <App />
    </Providers>,
  )
}
