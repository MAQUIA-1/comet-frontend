// Fictional library data for UI exploration.
export const albums = [
  { id: 'quiet', title: 'Quiet Coordinates', artist: 'Northbound', year: 2024, art: 'tides' },
  { id: 'rooms', title: 'Rooms of Light', artist: 'Aster Fields', year: 2023, art: 'geometry' },
  { id: 'still', title: 'Still Water', artist: 'Northbound', year: 2022, art: 'rain' },
  { id: 'slow', title: 'Slow Signals', artist: 'Mira Vale', year: 2021, art: 'horizon' },
  { id: 'lines', title: 'Parallel Lines', artist: 'Aster Fields', year: 2020, art: 'lines' },
  { id: 'drift', title: 'Drift Studies', artist: 'Mira Vale', year: 2024, art: 'drift' },
] as const

export const tracks = [
  { title: 'Between the Tides', artist: 'Northbound', album: 'Quiet Coordinates', albumId: 'quiet', duration: 248, art: 'tides' },
  { title: 'Soft Geometry', artist: 'Aster Fields', album: 'Rooms of Light', albumId: 'rooms', duration: 216, art: 'geometry' },
  { title: 'After the Rain', artist: 'Northbound', album: 'Quiet Coordinates', albumId: 'quiet', duration: 302, art: 'tides' },
  { title: 'The Quiet Hours', artist: 'Northbound', album: 'Still Water', albumId: 'still', duration: 231, art: 'rain' },
  { title: 'A Distant Signal', artist: 'Mira Vale', album: 'Slow Signals', albumId: 'slow', duration: 264, art: 'horizon' },
  { title: 'Parallel', artist: 'Aster Fields', album: 'Parallel Lines', albumId: 'lines', duration: 197, art: 'lines' },
  { title: 'Drifting Home', artist: 'Mira Vale', album: 'Drift Studies', albumId: 'drift', duration: 285, art: 'drift' },
]
