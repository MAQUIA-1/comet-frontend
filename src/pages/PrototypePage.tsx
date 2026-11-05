import { useMessages } from '../i18n'

export function PrototypePage() {
  const { placeholder: text } = useMessages()
  return <div className="page-placeholder"><p>{text.title}</p><p>{text.description}</p></div>
}
