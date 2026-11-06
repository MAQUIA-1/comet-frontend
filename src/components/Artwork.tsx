import { Music2 } from 'lucide-react'

export function Artwork({ art, large = false }: { art?: string; large?: boolean }) {
  return <span className={`album-art ${large ? 'album-art-large' : ''} ${art ?? 'no-art'}`} aria-hidden="true">{art ? <span className="art-orbit" /> : <Music2 size={large ? 64 : 20} />}</span>
}
