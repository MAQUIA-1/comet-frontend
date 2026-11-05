import { useState } from 'react'

import { tracks } from './library'
export { tracks } from './library'

export const scenarios = ['local', 'spotify', 'airplay', 'bluetooth', 'empty'] as const
export type Scenario = typeof scenarios[number]
export function useMockPlayback() {
  const [scenario, setScenario] = useState<Scenario>('local')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(64)
  const track = scenario === 'empty' || scenario === 'bluetooth' ? null : tracks[index]
  const canControl = scenario === 'local' || scenario === 'spotify'
  const canSeek = scenario === 'local'
  const selectTrack = (next: number) => { setIndex((next + tracks.length) % tracks.length); setPosition(0) }
  return { scenario, track, index, playing, position, canControl, canSeek,
    setPosition, selectTrack,
    playTrack: (next: number) => { setScenario('local'); setIndex(next); setPosition(0); setPlaying(true) },
    toggle: () => { if (canControl) setPlaying(value => !value) },
    changeScenario: (value: Scenario) => { setScenario(value); setPlaying(value !== 'empty' && value !== 'local'); setPosition(0) },
  }
}
export type MockPlayback = ReturnType<typeof useMockPlayback>
export function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` }
