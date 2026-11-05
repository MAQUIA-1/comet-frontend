import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrototypePage } from './pages/PrototypePage'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><PrototypePage /></StrictMode>,
)
