import { useState } from 'react'

// Fictional metadata and UI-only capabilities; not a service contract.
export const tracks = [
  { title: 'Between the Tides', artist: 'Northbound', album: 'Quiet Coordinates', duration: 248, art: 'tides' },
  { title: 'Soft Geometry', artist: 'Aster Fields', album: 'Rooms of Light', duration: 216, art: 'geometry' },
  { title: 'After the Rain', artist: 'Northbound', album: 'Quiet Coordinates', duration: 302, art: 'rain' },
]
export const scenarios = ['local', 'spotify', 'airplay', 'bluetooth', 'empty'] as const
export type Scenario = typeof scenarios[number]
export function useMockPlayback() {
  const [scenario, setScenario] = useState<Scenario>('local')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(64)
  const [queueOpen, setQueueOpen] = useState(false)
  const track = scenario === 'empty' || scenario === 'bluetooth' ? null : tracks[index]
  const canControl = scenario === 'local' || scenario === 'spotify'
  const canSeek = scenario === 'local'
  const selectTrack = (next: number) => { setIndex((next + tracks.length) % tracks.length); setPosition(0) }
  return { scenario, track, index, playing, position, queueOpen, canControl, canSeek,
    setPosition, setQueueOpen, selectTrack,
    toggle: () => { if (canControl) setPlaying(value => !value) },
    changeScenario: (value: Scenario) => { setScenario(value); setPlaying(value !== 'empty' && value !== 'local'); setPosition(0); setQueueOpen(false) },
  }
}
export type MockPlayback = ReturnType<typeof useMockPlayback>
export function formatTime(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` }
