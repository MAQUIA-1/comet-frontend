import { useState } from 'react'
import { AudioLines, Library, ListMusic, Workflow, Settings, Server, ChevronRight, Music2, Play, SkipBack, SkipForward } from 'lucide-react'
import { PageHeader } from './PageHeader'
import { PrototypePage } from '../pages/PrototypePage'

const pages = [
  { id: 'playing', title: 'Now Playing', label: '재생 중', icon: AudioLines, placement: 'main' },
  { id: 'library', title: 'Library', label: '라이브러리', icon: Library, placement: 'main' },
  { id: 'playlists', title: 'Playlists', label: '재생목록', icon: ListMusic, placement: 'main' },
  { id: 'chain', title: 'Signal Chain', label: '시그널 체인', icon: Workflow, placement: 'main' },
  { id: 'settings', title: 'Settings', label: '설정', icon: Settings, placement: 'footer' },
] as const

const devicePage = { id: 'device', title: 'Device Information' } as const
type PageId = (typeof pages)[number]['id'] | typeof devicePage.id

function Player({ onOpen }: { onOpen: () => void }) {
  return <section className="player panel" aria-label="플레이어">
    <button className="track-summary" onClick={onOpen} aria-label="Now Playing 열기">
      <span className="artwork"><Music2 size={22} /></span>
      <span><span className="track-title">재생 중인 음악 없음</span><span className="track-subtitle">음악을 기다리는 중</span></span>
    </button>
    <div className="transport">
      <div className="transport-buttons">
        <button className="icon-button skip" disabled aria-label="이전 곡"><SkipBack size={18} /></button>
        <button className="icon-button play-button" disabled aria-label="재생"><Play size={20} /></button>
        <button className="icon-button skip" disabled aria-label="다음 곡"><SkipForward size={18} /></button>
      </div>
      <div className="progress"><span>—:—</span><div className="progress-track" /><span>—:—</span></div>
    </div>
    <div className="player-end"><span>입력 소스 없음</span><button className="icon-button" disabled aria-label="재생 대기열"><ListMusic size={20} /></button></div>
  </section>
}

export function AppShell() {
  const [active, setActive] = useState<PageId>('playing')
  const [collapsed, setCollapsed] = useState(false)
  const page = active === devicePage.id ? devicePage : pages.find(item => item.id === active)!
  const navigation = (mobile = false, placement?: 'main' | 'footer') => pages.filter(item => !placement || item.placement === placement).map(({ id, title, label, icon: Icon }) =>
    <button key={id} className="nav-item" aria-current={active === id ? 'page' : undefined} aria-label={title} title={title} onClick={() => setActive(id)}>
      <Icon size={20} /><span>{mobile ? label : title}</span>
    </button>,
  )
  return <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
    <aside className="sidebar panel" aria-label="사이드바">
      <button className={collapsed ? 'nav-item' : 'wordmark'} onClick={() => setActive('device')} aria-label="COMET 기기 정보" aria-current={active === 'device' ? 'page' : undefined} title="기기 정보">{collapsed ? <Server size={20} /> : <><span>COMET</span><ChevronRight size={18} /></>}</button>
      <div className="sidebar-divider" aria-hidden="true" />
      <nav className="desktop-nav" aria-label="주 내비게이션">{navigation(false, 'main')}</nav>
      <nav aria-label="설정">{navigation(false, 'footer')}</nav>
    </aside>
    <main className="content panel" id="main-content">
      <div className="mobile-brand"><button className="wordmark" onClick={() => setActive('device')} aria-label="COMET 기기 정보"><span>COMET</span><ChevronRight size={16} /></button></div>
      <div className="page-content">
        <PageHeader title={page.title} collapsed={collapsed} onToggleSidebar={() => setCollapsed(value => !value)} />
        <PrototypePage />
      </div>
    </main>
    <Player onOpen={() => setActive('playing')} />
    <nav className="mobile-nav panel" aria-label="모바일 내비게이션">{navigation(true)}</nav>
  </div>
}
