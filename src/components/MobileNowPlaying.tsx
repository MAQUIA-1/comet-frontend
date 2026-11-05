import { motionOptions } from '../utils/motion'
import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useMessages } from '../i18n'
import { NowPlaying } from './Playback'
import type { MockPlayback } from '../mocks/playback'

export function MobileNowPlaying({ open, onClose, playback }: { open: boolean; onClose: () => void; playback: MockPlayback }) {
  const ref = useRef<HTMLDialogElement>(null)
  const closing = useRef(false)
  const text = useMessages()
  useEffect(() => {
    const dialog = ref.current!
    if (open && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
      dialog.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], motionOptions(dialog, 'enter'))
    } else if (!open) dialog.close()
  }, [open])
  async function minimize() {
    if (closing.current) return
    closing.current = true
    const dialog = ref.current!
    const transform = getComputedStyle(dialog).transform
    dialog.getAnimations().forEach(animation => animation.cancel())
    await dialog.animate([{ transform }, { transform: 'translateY(100%)' }], { ...motionOptions(dialog, 'exit'), fill: 'forwards' }).finished.catch(() => {})
    dialog.close()
    dialog.getAnimations().forEach(animation => animation.cancel())
    closing.current = false
    onClose()
  }
  return <dialog ref={ref} className="mobile-playing-sheet" aria-labelledby="mobile-playing-title" onCancel={event => { event.preventDefault(); void minimize() }}>
    <header className="page-header">
      <button className="icon-button" onClick={() => void minimize()} aria-label={text.navigation.minimize}><ChevronDown size={24} /></button>
      <h1 id="mobile-playing-title">{text.pages.playing}</h1>
    </header>
    <NowPlaying state={playback} />
  </dialog>
}
