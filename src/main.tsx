import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from '~ek/App'
import '~ek/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
