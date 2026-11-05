import { useViewport } from '../layout/ViewportProvider'
import { ExpandedPlayer } from './ExpandedPlayer'
import { DevTools } from './DevTools'
import { Player } from './Playback'
import { useMockPlayback } from '../mocks/playback'
import { useSignalChain } from '../mocks/signalChain'
import { useMessages } from '../i18n'
import { useState } from 'react'
import { Library, ListMusic, Workflow, Settings, Server, ChevronRight } from 'lucide-react'
import { PageHeader } from './PageHeader'
import { LibraryPage } from '../pages/LibraryPage'
import { DeviceInformationPage } from '../pages/DeviceInformationPage'
import { SignalChainPage } from '../pages/SignalChainPage'
import { PrototypePage } from '../pages/PrototypePage'

const pages = [
  { id: 'library', icon: Library, placement: 'main' },
  { id: 'playlists', icon: ListMusic, placement: 'main' },
  { id: 'chain', icon: Workflow, placement: 'main' },
  { id: 'settings', icon: Settings, placement: 'footer' },
] as const

const devicePage = { id: 'device' } as const
type PageId = (typeof pages)[number]['id'] | typeof devicePage.id

export function AppShell() {
  const { mode } = useViewport()
  const text = useMessages()
  const playback = useMockPlayback()
  const chain = useSignalChain()
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<PageId>('library')
  const navigate = (id: PageId) => setActive(id)
  const [collapsed, setCollapsed] = useState(false)
  const navigation = (mobile = false, placement?: 'main' | 'footer') => pages.filter(item => (!placement || item.placement === placement)).map(({ id, icon: Icon }) =>
    <button key={id} className="nav-item" aria-current={active === id ? 'page' : undefined} aria-label={text.pages[id]} title={text.pages[id]} onClick={() => navigate(id)}>
      <Icon size={20} /><span>{mobile ? text.tabs[id] : text.pages[id]}</span>
    </button>,
  )
  return <div data-viewport={mode} className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
    {import.meta.env.DEV && <DevTools playback={playback} />}
    <aside className="sidebar panel" aria-label={text.navigation.sidebar}>
      <button className={collapsed ? 'nav-item' : 'wordmark'} onClick={() => navigate('device')} aria-label={text.pages.device} aria-current={active === 'device' ? 'page' : undefined} title={text.pages.device}>{collapsed ? <Server size={20} /> : <><span>COMET</span><ChevronRight size={18} /></>}</button>
      <div className="sidebar-divider" aria-hidden="true" />
      <nav className="desktop-nav" aria-label={text.navigation.main}>{navigation(false, 'main')}</nav>
      <nav aria-label={text.pages.settings}>{navigation(false, 'footer')}</nav>
    </aside>
    <main className="content panel" id="main-content">
      <div className="page-content">
        <PageHeader title={text.pages[active]} collapsed={collapsed} onToggleSidebar={() => setCollapsed(value => !value)} />
        <div className="page-scroll" key={active} tabIndex={0} role="region" aria-label={text.pages[active]}><>
          {active === 'settings' && <button className="mobile-device-link nav-item" onClick={() => navigate('device')}><Server size={20} /><span>{text.pages.device}</span><ChevronRight size={18} /></button>}
          {active === 'library' ? <LibraryPage playback={playback} /> : active === 'device' ? <DeviceInformationPage /> : active === 'chain' ? <SignalChainPage chain={chain} /> : <PrototypePage />}
        </></div>
      </div>
    </main>
    <ExpandedPlayer open={expanded} onClose={() => setExpanded(false)} playback={playback} />
    <Player state={playback} onOpen={() => setExpanded(true)} />
    <nav className="mobile-nav panel" aria-label={text.navigation.mobile}>{navigation(true)}</nav>
  </div>
}
