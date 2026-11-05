export const en = {
  pages: {
    playing: 'Now Playing', library: 'Library', playlists: 'Playlists',
    chain: 'Signal Chain', settings: 'Settings', device: 'Device Information',
  },
  tabs: { playing: 'Playing', library: 'Library', playlists: 'Playlists', chain: 'Signal Chain', settings: 'Settings' },
  navigation: { sidebar: 'Sidebar', main: 'Main navigation', mobile: 'Mobile navigation', expand: 'Expand sidebar', collapse: 'Collapse sidebar' },
  player: { label: 'Player', open: 'Open Now Playing', empty: 'Nothing playing', waiting: 'Waiting for music', previous: 'Previous track', play: 'Play', next: 'Next track', noSource: 'No input source', queue: 'Play queue' },
  placeholder: { title: 'A space for what comes next', description: 'This page will take shape in the next stage.', previewTitle: 'Scroll preview', previewDescription: 'Temporary sample content to check scrolling and fixed panels.', sampleTrack: 'Sample track', sampleArtist: 'Example artist / Example album', previewEnd: 'End of preview'  },
}

// Preserve the key structure while allowing translated string values.
export type Messages = { [K in keyof typeof en]: { [P in keyof typeof en[K]]: string } }
