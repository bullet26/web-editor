import ReactDOM from 'react-dom/client'
import { Providers } from 'provider/Provider'
import { App } from './App'
import './index.scss'

declare global {
  interface Window {
    initPlugin: (id: string) => void
  }
}

const mode = import.meta.env.VITE_MODE

if (mode === 'production') {
  window.initPlugin = (id: string) => {
    const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement)
    root.render(
      <Providers>
        <App />
      </Providers>,
    )
  }
}

if (mode === 'develop') {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Providers>
      <App />
    </Providers>,
  )
}
