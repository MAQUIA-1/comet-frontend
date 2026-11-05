import { useMessages } from '../i18n'
import { tracks, formatTime } from '../mocks/playback'
import type { MockPlayback } from '../mocks/playback'

// An inline continuation of Now Playing, not a separate navigation surface.
export function Queue({ state }: { state: MockPlayback }) {
  const { queue: text } = useMessages()
  const local = state.scenario === 'local'
  const upcoming = local ? tracks.map((track, index) => ({ ...track, index })).slice(state.index + 1) : []

  return <section className="up-next" aria-label={text.next}>
    <h2>{text.next}</h2>
    {upcoming.length ? <ol>{upcoming.map(track => <li key={track.title}>
      <button className="nav-item queue-track" onClick={() => state.selectTrack(track.index)}>
        <span><strong>{track.title}</strong><small>{track.artist}</small></span>
        <span>{formatTime(track.duration)}</span>
      </button>
    </li>)}</ol> : <p className="queue-empty">{local || state.scenario === 'empty' ? text.empty : text.unavailable}</p>}
  </section>
}
