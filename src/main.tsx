import ReactDOM from 'react-dom/client'
import Providers from 'provider'
import { App } from './App'

import './index.scss'

// declare global {
//   interface Window {
//     initPlugin: (id: string) => void
//   }
// }

// window.initPlugin = (id: string) => {
//   const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement)
//   root.render(
//     <Providers>
//       <App />
//     </Providers>
//   )
// }

// standard

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <App />
  </Providers>,
)
