import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Viewport = { mode: 'mobile' | 'desktop'; isMobile: boolean }
const ViewportContext = createContext<Viewport | null>(null)

function createDesktopQuery() {
  const tokens = getComputedStyle(document.documentElement)
  const desktop = tokens.getPropertyValue('--breakpoint-desktop').trim()
  return matchMedia(`(min-width: ${desktop})`)
}

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [desktop] = useState(createDesktopQuery)
  const read = (): Viewport => ({
    mode: desktop.matches ? 'desktop' : 'mobile',
    isMobile: !desktop.matches,
  })
  const [viewport, setViewport] = useState(read)

  useEffect(() => {
    const update = () => setViewport(read())
    desktop.addEventListener('change', update)
    update()
    return () => {
      desktop.removeEventListener('change', update)
    }
  }, [desktop])

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>
}

export function useViewport() {
  const viewport = useContext(ViewportContext)
  if (!viewport) throw new Error('useViewport requires ViewportProvider')
  return viewport
}
