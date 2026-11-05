import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useMessages } from '../i18n'
import { tracks, formatTime } from '../mocks/playback'
import type { MockPlayback } from '../mocks/playback'

export function Queue({ state, onClose, panel = false }: { state: MockPlayback; onClose: () => void; panel?: boolean }) {
  const { queue: text, player } = useMessages()
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => {
      if (previous?.isConnected) previous.focus()
      else document.querySelector<HTMLButtonElement>('.expanded-player .page-header button')?.focus()
    }
  }, [])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (panel && document.querySelector('dialog[open]')) return
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [onClose, panel])
  const upcoming = tracks.map((track, index) => ({ ...track, index })).slice(state.index + 1)
  return <section className={panel ? 'queue-panel panel' : 'queue-view'} aria-label={player.queue} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onClose() } }}>
    <header className="queue-header"><h2>{player.queue}</h2><button ref={closeRef} className="icon-button" aria-label={text.close} onClick={onClose}><X size={20} /></button></header>
    <div className="queue-scroll">
      <h3>{text.current}</h3>
      <div className="queue-current"><strong>{state.track?.title}</strong><span>{state.track?.artist}</span></div>
      <h3>{text.next}</h3>
      {upcoming.length ? <ol>{upcoming.map(track => <li key={track.title}><button className="nav-item queue-track" onClick={() => state.selectTrack(track.index)}><span><strong>{track.title}</strong><small>{track.artist}</small></span><span>{formatTime(track.duration)}</span></button></li>)}</ol> : <p className="queue-empty">{text.empty}</p>}
    </div>
  </section>
}
