export const en = {
  pages: {
    playing: 'Now Playing', library: 'Library', playlists: 'Playlists',
    chain: 'Signal Chain', settings: 'Settings', device: 'Device Information',
  },
  tabs: { library: 'Library', playlists: 'Playlists', chain: 'Signal Chain', settings: 'Settings' },
  navigation: { sidebar: 'Sidebar', main: 'Main navigation', mobile: 'Mobile navigation', expand: 'Expand sidebar', collapse: 'Collapse sidebar', minimize: 'Minimize Now Playing' },
  player: { label: 'Player', open: 'Open Now Playing', empty: 'Nothing playing', waiting: 'Waiting for music', previous: 'Previous track', play: 'Play', next: 'Next track', noSource: 'No input source', pause: 'Pause', seek: 'Playback position' },
  placeholder: { title: 'A space for what comes next', description: 'This page will take shape in the next stage.' },
  queue: { next: 'Up next', empty: 'No more tracks in the queue.', unavailable: 'Queue is not available in this preview scenario.' },
  library: { albums: 'Albums', artists: 'Artists', tracks: 'Tracks', folders: 'Folders', search: 'Search library', noResults: 'No matching results.', clearSearch: 'Clear search', closeSearch: 'Close search', folderRoot: 'Music', folderBack: 'Back to folders', views: 'Library views', backTo: 'Back to', back: 'Back to library', backArtists: 'Back to artists', songs: 'tracks', playAlbum: 'Play album', album: 'Album',  playTrack: 'Play' },
  development: { title: 'Dev tools' },
  signal: { direct: 'Direct', processed: 'Processing', directDescription: 'Bypasses all modules', processedDescription: 'Uses enabled modules', processing: 'Processing', empty: 'No modules in the chain', addModule: 'Add module', gain: 'Gain', eq: 'Parametric EQ', crossfeed: 'Crossfeed', frequency: 'Frequency', q: 'Q', amount: 'Amount', active: 'Enabled', bypassed: 'Bypassed', moveUp: 'Move up', moveDown: 'Move down', enable: 'Enable', remove: 'Remove' },
  device: { audio: 'Audio', outputDevice: 'Output device', pcmStream: 'PCM stream', pcmFormat: 'PCM format', mpdService: 'MPD', running: 'Running', network: 'Network', ethernet: 'Ethernet', linkUp: 'Link up', linkSpeed: 'Link speed', ipAddress: 'IP address', systemTraffic: 'System traffic', receive: 'Receive', send: 'Send', trafficChart: 'Simulated system network traffic over the last 46 seconds, scale from 0 to 3 megabits per second', trafficPast: '46 seconds ago', now: 'Now', system: 'System', cpu: 'CPU', temperature: 'SoC temperature', uptime: 'Uptime', softwareVersion: 'Software version' },
  playback: { local: 'Local / NAS', spotify: 'Spotify Connect', airplay: 'AirPlay', bluetooth: 'Bluetooth', empty: 'No input', preview: 'Preview scenario', mockOnly: 'UI simulation · no audio', noMetadata: 'Metadata unavailable', externalSelection: 'Select music on your connected device.', idle: 'Idle', playing: 'Playing', paused: 'Paused', source: 'Input source', format: 'Source format', unavailable: 'Not provided in this scenario',  },
}

// Preserve the key structure while allowing translated string values.
export type Messages = { [K in keyof typeof en]: { [P in keyof typeof en[K]]: string } }
