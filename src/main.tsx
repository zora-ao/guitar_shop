import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AllProviders } from './providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllProviders>
      <App />
    </AllProviders>
  </StrictMode>,
)
