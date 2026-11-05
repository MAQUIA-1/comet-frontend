import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Play, Music2, Folder, Search, X } from 'lucide-react'
import { useMessages } from '../i18n'
import { Artwork } from '../components/Playback'
import { albums, tracks } from '../mocks/library'
import { formatTime } from '../mocks/playback'
import type { MockPlayback } from '../mocks/playback'

type View = 'albums' | 'artists' | 'tracks' | 'folders'
export function LibraryPage({ playback }: { playback: MockPlayback }) {
  const { library: t } = useMessages()
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])
  const closeSearch = () => { setQuery(''); setSearchOpen(false); requestAnimationFrame(() => searchButtonRef.current?.focus()) }
  const [view, setView] = useState<View>('albums')
  const [albumId, setAlbumId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [folderArtist, setFolderArtist] = useState<string | null>(null)
  const [folderAlbum, setFolderAlbum] = useState<string | null>(null)
  const match = (...values: string[]) => values.some(value => value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  const [artist, setArtist] = useState<string | null>(null)
  const album = albums.find(item => item.id === albumId)
  const artists = [...new Set(albums.map(item => item.artist))]
  const albumTracks = album ? tracks.map((track, index) => ({ ...track, index })).filter(track => track.albumId === album.id) : []
  const changeView = (next: View) => { setView(next); setAlbumId(null); setArtist(null); setFolderArtist(null); setFolderAlbum(null); setQuery('') }
  const back = () => { if (albumId) setAlbumId(null); else setArtist(null); setQuery('') }
  const rows = (items: Array<typeof tracks[number] & { index: number }>, showAlbum = false) => <div className="library-tracks">
    {items.length === 0 && <p className="library-empty">{t.noResults}</p>}
    {items.map((track, number) => <button key={track.index} className="library-track" onClick={() => playback.playTrack(track.index)} aria-label={`${t.playTrack} ${track.title} — ${track.artist}`}>
      <span className="library-track-number">{String(number + 1).padStart(2, '0')}</span>
      <span className="library-track-info"><strong>{track.title}</strong><small>{track.artist}{showAlbum && <span className="library-track-mobile-album"> · {track.album}</span>}</small></span>
      {showAlbum && <span className="library-track-album">{track.album}</span>}
      <span className="library-duration">{formatTime(track.duration)}</span><Play className="library-track-play" size={16} />
    </button>)}
  </div>
  return <div className="library-page">
    <div className={`library-toolbar ${searchOpen ? 'is-searching' : ''}`}>
      <div className="library-tabs" role="group" aria-label={t.views}>
        {(['albums', 'artists', 'tracks', 'folders'] as const).map(item => <button key={item} className="library-tab" aria-pressed={view === item} onClick={() => changeView(item)}>{t[item]}</button>)}
      </div>
      {!searchOpen && <button ref={searchButtonRef} className="library-search-toggle icon-button" aria-label={t.search} aria-expanded={false} onClick={() => setSearchOpen(true)}><Search size={20} /></button>}
      {searchOpen && <div className="library-search" onBlur={event => {
        if (!query.trim() && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setQuery('')
          setSearchOpen(false)
        }
      }}><Search size={18} aria-hidden="true" /><input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') { closeSearch() } }} aria-label={t.search} placeholder={t.search} /><button className="icon-button" aria-label={t.closeSearch} onClick={closeSearch}><X size={17} /></button></div>}
    </div>
    {query.trim() && !album && view === 'albums' && !albums.some(item => match(item.title, item.artist)) && <p className="library-empty">{t.noResults}</p>}
    {query.trim() && !album && view === 'artists' && !(artist ? albums.some(item => item.artist === artist && match(item.title, item.artist)) : artists.some(name => match(name))) && <p className="library-empty">{t.noResults}</p>}
    {album ? <section className="library-detail">
      <button className="library-back" onClick={back}><ArrowLeft size={17} />{artist ? `${t.backTo} ${artist}` : t.back}</button>
      <div className="album-hero"><Artwork art={album.art} large /><div><p className="library-kicker">{t.album} · {album.year}</p><h2>{album.title}</h2><p>{album.artist} · {albumTracks.length} {t.songs}</p><button className="library-play" onClick={() => playback.playTrack(albumTracks[0].index)}><Play size={16} fill="currentColor" />{t.playAlbum}</button></div></div>
      {rows(albumTracks.filter(track => match(track.title, track.artist, track.album)))}
    </section> : artist ? <section><button className="library-back" onClick={back}><ArrowLeft size={17} />{t.backArtists}</button><h2 className="library-section-title">{artist}</h2><div className="album-grid">{albums.filter(item => item.artist === artist && match(item.title, item.artist)).map(item => <button key={item.id} className="album-item" onClick={() => { setAlbumId(item.id); setQuery('') }}><Artwork art={item.art} large /><strong>{item.title}</strong><span>{item.year}</span></button>)}</div></section> : view === 'albums' ? <section><div className="album-grid">{albums.filter(item => match(item.title, item.artist)).map(item => <button key={item.id} className="album-item" onClick={() => { setAlbumId(item.id); setQuery('') }}><Artwork art={item.art} large /><strong>{item.title}</strong><span>{item.artist}</span></button>)}</div></section> : view === 'artists' ? <section><div className="artist-list">{artists.filter(name => match(name)).map(name => <button key={name} className="artist-item" onClick={() => { setArtist(name); setQuery('') }}><span className="artist-avatar"><Music2 size={22} /></span><span><strong>{name}</strong><small>{albums.filter(item => item.artist === name).length} {t.albums}</small></span><ArrowLeft className="artist-arrow" size={18} /></button>)}</div></section> : view === 'tracks' ? <section>{rows(tracks.map((track, index) => ({ ...track, index })).filter(track => match(track.title, track.artist, track.album)), true)}</section> : <section>
      {(folderArtist || folderAlbum) && <button className="library-back" onClick={() => { if (folderAlbum) setFolderAlbum(null); else setFolderArtist(null); setQuery('') }}><ArrowLeft size={17} />{folderAlbum ? `${t.backTo} ${folderArtist}` : t.folderBack}</button>}
      <p className="folder-path">{[t.folderRoot, folderArtist, folderAlbum && albums.find(item => item.id === folderAlbum)?.title].filter(Boolean).join(' / ')}</p>
      {folderAlbum ? rows(tracks.map((track, index) => ({ ...track, index })).filter(track => track.albumId === folderAlbum && match(track.title, track.artist, track.album))) : <div className="folder-list">
        {(folderArtist ? albums.filter(item => item.artist === folderArtist && match(item.title)).map(item => ({ id: item.id, name: item.title })) : artists.filter(name => match(name)).map(name => ({ id: name, name }))).map(item => <button key={item.id} className="folder-item" onClick={() => { if (folderArtist) setFolderAlbum(item.id); else setFolderArtist(item.id); setQuery('') }}><Folder size={20} /><span>{item.name}</span></button>)}
        {(folderArtist ? albums.filter(item => item.artist === folderArtist && match(item.title)).length : artists.filter(name => match(name)).length) === 0 && <p className="library-empty">{t.noResults}</p>}
      </div>}
    </section>}
  </div>
}
