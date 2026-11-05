import { useMessages } from '../i18n'
import { scrollPreviewRows } from '../mocks/scrollPreview'

export function PrototypePage() {
  const { placeholder: text } = useMessages()
  return <div className="page-placeholder">
    <div className="scroll-preview-intro">
      <p>{text.previewTitle}</p>
      <p>{text.previewDescription}</p>
    </div>
    <ol className="scroll-preview-list" aria-label={text.previewTitle}>
      {scrollPreviewRows.map(row => <li key={row.id}>
        <span className="scroll-preview-number">{String(row.id).padStart(2, '0')}</span>
        <div><p>{text.sampleTrack} {row.id}</p><p>{text.sampleArtist}</p></div>
        <span className="scroll-preview-duration">{row.duration}</span>
      </li>)}
    </ol>
    <p className="scroll-preview-end">{text.previewEnd}</p>
  </div>
}
