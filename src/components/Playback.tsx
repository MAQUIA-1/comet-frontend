import type { CSSProperties } from 'react'
import { Music2, Play, Pause, SkipBack, SkipForward, ListMusic } from 'lucide-react'
import { useMessages } from '../i18n'
import { formatTime, tracks } from '../mocks/playback'
import type { MockPlayback } from '../mocks/playback'

function Artwork({ art, large = false }: { art?: string; large?: boolean }) {
  return <span className={`album-art ${large ? 'album-art-large' : ''} ${art ?? 'no-art'}`} aria-hidden="true">{art ? <span className="art-orbit" /> : <Music2 size={large ? 64 : 20} />}</span>
}
export function Controls({ state }: { state: MockPlayback }) {
  const { player: t } = useMessages()
  return <div className="transport-buttons">
    <button className="icon-button skip" disabled={!state.canControl || state.index === 0} aria-label={t.previous} onClick={() => state.selectTrack(state.index - 1)}><SkipBack size={18} /></button>
    <button className="icon-button play-button" disabled={!state.canControl} aria-label={state.playing ? t.pause : t.play} onClick={state.toggle}>{state.playing ? <Pause size={20} /> : <Play size={20} />}</button>
    <button className="icon-button skip" disabled={!state.canControl || state.index === tracks.length - 1} aria-label={t.next} onClick={() => state.selectTrack(state.index + 1)}><SkipForward size={18} /></button>
  </div>
}
function Seek({ state }: { state: MockPlayback }) {
  const { player: t } = useMessages()
  return <div className="progress"><span>{formatTime(state.position)}</span><input aria-label={t.seek} type="range" style={{ '--seek-position': `${state.track ? state.position / state.track.duration * 100 : 0}%` } as CSSProperties} min={0} max={state.track?.duration ?? 0} value={state.position} disabled={!state.canSeek || !state.track} onChange={event => state.setPosition(Number(event.target.value))} /><span>{state.track ? formatTime(state.track.duration) : '—:—'}</span></div>
}
export function Player({ state, onOpen, queueOpen, onQueue }: { state: MockPlayback; onOpen: () => void; queueOpen: boolean; onQueue: () => void }) {
  const { player: t, playback: m } = useMessages()
  return <section className="player panel" aria-label={t.label}>
    <button className="track-summary" onClick={onOpen} aria-label={t.open}><Artwork art={state.track?.art} /><span><span className="track-title">{state.track?.title ?? (state.scenario === 'empty' ? t.empty : m.noMetadata)}</span><span className="track-subtitle">{state.track?.artist ?? m[state.scenario]}</span></span></button>
    <div className="transport"><Controls state={state} /><Seek state={state} /></div>
    <div className="player-end"><span>{m[state.scenario]}</span><button className="icon-button" disabled={state.scenario !== 'local'} aria-label={t.queue} aria-expanded={queueOpen} onClick={onQueue}><ListMusic size={20} /></button></div>
  </section>
}
export function NowPlaying({ state, onQueue }: { state: MockPlayback; onQueue: () => void }) {
  const { playback: t, player: p } = useMessages()
  return <div className="now-playing">
    <div className="listening-view"><Artwork art={state.track?.art} large /><div className="listening-info">
      <p className="source-label">{t[state.scenario]} <span> / {state.scenario === 'empty' ? t.idle : state.playing ? t.playing : t.paused}</span></p>
      <h2>{state.track?.title ?? (state.scenario === 'empty' ? p.empty : t.noMetadata)}</h2>
      <p className="artist-name">{state.track?.artist ?? (state.scenario === 'empty' ? p.waiting : t.externalSelection)}</p>
      {state.track && <p className="album-name">{state.track.album}</p>}
      <div className="expanded-controls"><Seek state={state} /><Controls state={state} /><button className="icon-button" disabled={state.scenario !== 'local'} aria-label={p.queue} aria-expanded={false} onClick={onQueue}><ListMusic size={20} /></button></div>
      <dl className="audio-details"><div><dt>{t.format}</dt><dd>{state.scenario === 'local' ? 'FLAC · 24-bit / 96 kHz' : t.unavailable}</dd></div></dl>
    </div></div>
  </div>
}
