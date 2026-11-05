import { useMessages } from '../i18n'
import { useState } from 'react'
import { AudioLines, Library, ListMusic, Workflow, Settings, Server, ChevronRight, Music2, Play, SkipBack, SkipForward } from 'lucide-react'
import { PageHeader } from './PageHeader'
import { PrototypePage } from '../pages/PrototypePage'

const pages = [
  { id: 'playing', icon: AudioLines, placement: 'main' },
  { id: 'library', icon: Library, placement: 'main' },
  { id: 'playlists', icon: ListMusic, placement: 'main' },
  { id: 'chain', icon: Workflow, placement: 'main' },
  { id: 'settings', icon: Settings, placement: 'footer' },
] as const

const devicePage = { id: 'device' } as const
type PageId = (typeof pages)[number]['id'] | typeof devicePage.id

function Player({ onOpen }: { onOpen: () => void }) {
  const { player: text } = useMessages()
  return <section className="player panel" aria-label={text.label}>
    <button className="track-summary" onClick={onOpen} aria-label={text.open}>
      <span className="artwork"><Music2 size={22} /></span>
      <span><span className="track-title">{text.empty}</span><span className="track-subtitle">{text.waiting}</span></span>
    </button>
    <div className="transport">
      <div className="transport-buttons">
        <button className="icon-button skip" disabled aria-label={text.previous}><SkipBack size={18} /></button>
        <button className="icon-button play-button" disabled aria-label={text.play}><Play size={20} /></button>
        <button className="icon-button skip" disabled aria-label={text.next}><SkipForward size={18} /></button>
      </div>
      <div className="progress"><span>—:—</span><div className="progress-track" /><span>—:—</span></div>
    </div>
    <div className="player-end"><span>{text.noSource}</span><button className="icon-button" disabled aria-label={text.queue}><ListMusic size={20} /></button></div>
  </section>
}

export function AppShell() {
  const text = useMessages()
  const [active, setActive] = useState<PageId>('playing')
  const [collapsed, setCollapsed] = useState(false)
  const navigation = (mobile = false, placement?: 'main' | 'footer') => pages.filter(item => !placement || item.placement === placement).map(({ id, icon: Icon }) =>
    <button key={id} className="nav-item" aria-current={active === id ? 'page' : undefined} aria-label={text.pages[id]} title={text.pages[id]} onClick={() => setActive(id)}>
      <Icon size={20} /><span>{mobile ? text.tabs[id] : text.pages[id]}</span>
    </button>,
  )
  return <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
    <aside className="sidebar panel" aria-label={text.navigation.sidebar}>
      <button className={collapsed ? 'nav-item' : 'wordmark'} onClick={() => setActive('device')} aria-label={text.pages.device} aria-current={active === 'device' ? 'page' : undefined} title={text.pages.device}>{collapsed ? <Server size={20} /> : <><span>COMET</span><ChevronRight size={18} /></>}</button>
      <div className="sidebar-divider" aria-hidden="true" />
      <nav className="desktop-nav" aria-label={text.navigation.main}>{navigation(false, 'main')}</nav>
      <nav aria-label={text.pages.settings}>{navigation(false, 'footer')}</nav>
    </aside>
    <main className="content panel" id="main-content">
      <div className="mobile-brand"><button className="wordmark" onClick={() => setActive('device')} aria-label={text.pages.device}><span>COMET</span><ChevronRight size={16} /></button></div>
      <div className="page-content">
        <PageHeader title={text.pages[active]} collapsed={collapsed} onToggleSidebar={() => setCollapsed(value => !value)} />
        <div className="page-scroll" key={active} tabIndex={0} role="region" aria-label={text.pages[active]}><PrototypePage /></div>
      </div>
    </main>
    <Player onOpen={() => setActive('playing')} />
    <nav className="mobile-nav panel" aria-label={text.navigation.mobile}>{navigation(true)}</nav>
  </div>
}
