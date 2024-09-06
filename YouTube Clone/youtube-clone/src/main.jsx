import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SetContextProvider from './contexts/setContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SetContextProvider>
        <App />
      </SetContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
