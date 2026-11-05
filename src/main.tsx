import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './components/AppShell'
import { LanguageProvider } from './i18n'
import { ViewportProvider } from './layout/ViewportProvider'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><LanguageProvider><ViewportProvider><AppShell /></ViewportProvider></LanguageProvider></StrictMode>,
)
