import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export function PrototypePage({ title, collapsed, onToggleSidebar }: { title: string; collapsed: boolean; onToggleSidebar: () => void }) {
  return <div className="page-placeholder" key={title}>
    <header><div className="page-title-row"><button className="sidebar-toggle icon-button" onClick={onToggleSidebar} aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'} title={collapsed ? '사이드바 펼치기' : '사이드바 접기'} aria-expanded={!collapsed}>{collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button><h1>{title}</h1></div></header>
    <div className="placeholder-body"><p>아직 채워지지 않은 공간</p><p>이 화면의 콘텐츠는 다음 단계에서 구성합니다.</p></div>
    <p className="prototype-note">COMET / UI PROTOTYPE</p>
  </div>
}
