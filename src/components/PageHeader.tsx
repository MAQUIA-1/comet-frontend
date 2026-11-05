import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export function PageHeader({ title, collapsed, onToggleSidebar }: {
  title: string
  collapsed: boolean
  onToggleSidebar: () => void
}) {
  const toggleLabel = collapsed ? '사이드바 펼치기' : '사이드바 접기'

  return <header className="page-header">
    <button className="sidebar-toggle icon-button" onClick={onToggleSidebar} aria-label={toggleLabel} title={toggleLabel} aria-expanded={!collapsed}>
      {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
    </button>
    <h1>{title}</h1>
  </header>
}
