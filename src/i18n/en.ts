export const en = {
  pages: {
    playing: 'Now Playing', library: 'Library', playlists: 'Playlists',
    chain: 'Signal Chain', settings: 'Settings', device: 'Device Information',
  },
  tabs: { library: 'Library', playlists: 'Playlists', chain: 'Signal Chain', settings: 'Settings' },
  navigation: { sidebar: 'Sidebar', main: 'Main navigation', mobile: 'Mobile navigation', expand: 'Expand sidebar', collapse: 'Collapse sidebar', minimize: 'Minimize Now Playing' },
  player: { label: 'Player', open: 'Open Now Playing', empty: 'Nothing playing', waiting: 'Waiting for music', previous: 'Previous track', play: 'Play', next: 'Next track', noSource: 'No input source', queue: 'Play queue', pause: 'Pause', seek: 'Playback position' },
  placeholder: { title: 'A space for what comes next', description: 'This page will take shape in the next stage.' },
  queue: { current: 'Now playing', next: 'Up next', empty: 'No more tracks in the queue.', close: 'Close queue' },
  development: { title: 'Dev tools' },
  playback: { local: 'Local / NAS', spotify: 'Spotify Connect', airplay: 'AirPlay', bluetooth: 'Bluetooth', empty: 'No input', preview: 'Preview scenario', mockOnly: 'UI simulation · no audio', noMetadata: 'Metadata unavailable', externalSelection: 'Select music on your connected device.', idle: 'Idle', playing: 'Playing', paused: 'Paused', format: 'Source format', unavailable: 'Not provided in this scenario', closeQueue: 'Close queue' },
}

// Preserve the key structure while allowing translated string values.
export type Messages = { [K in keyof typeof en]: { [P in keyof typeof en[K]]: string } }
