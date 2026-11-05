import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useMessages } from '../i18n'
import type { ModuleKind, SignalChainState } from '../mocks/signalChain'

type ParameterKey = 'gain' | 'frequency' | 'q' | 'amount'
const parameters: Record<ModuleKind, { key: ParameterKey; min: number; max: number; step: number; unit: string }[]> = {
  gain: [{ key: 'gain', min: -12, max: 12, step: .5, unit: 'dB' }],
  eq: [{ key: 'frequency', min: 20, max: 20000, step: 10, unit: 'Hz' }, { key: 'gain', min: -12, max: 12, step: .5, unit: 'dB' }, { key: 'q', min: .1, max: 10, step: .1, unit: '' }],
  crossfeed: [{ key: 'amount', min: 0, max: 100, step: 1, unit: '%' }],
}

export function SignalChainPage({ chain }: { chain: SignalChainState }) {
  const { signal: t } = useMessages()
  const [adding, setAdding] = useState(false)
  const active = !chain.bypassed && chain.modules.some(item => item.enabled)
  const processingOn = !chain.bypassed
  const names = { gain: t.gain, eq: t.eq, crossfeed: t.crossfeed }
  const parameterNames = { gain: t.gain, frequency: t.frequency, q: t.q, amount: t.amount }

  return <div className="signal-page">
    <div className="signal-overview">
      <h2 className={active ? 'is-processed' : undefined}>{active ? t.processed : t.direct}</h2>
      <button className="signal-processing" role="switch" aria-label={t.processing} aria-checked={processingOn} onClick={() => chain.setBypassed(!chain.bypassed)}><span className="signal-switch" aria-hidden="true"><span /></span></button>
    </div>
    <div className="signal-heading"><div className="signal-add-wrap" onKeyDown={event => { if (event.key === 'Escape') { setAdding(false); event.currentTarget.querySelector('button')?.focus() } }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setAdding(false) }}><button className="signal-add" aria-expanded={adding} onClick={() => setAdding(!adding)}><Plus size={16} />{t.addModule}<ChevronDown size={16} /></button>
      {adding && <div className="signal-add-menu">{(['gain', 'eq', 'crossfeed'] as const).map(kind => <button key={kind} onClick={() => { chain.add(kind); setAdding(false) }}>{names[kind]}</button>)}</div>}</div></div>
    <div className="signal-path">
      {chain.modules.length === 0 && <p className="signal-empty">{t.empty}</p>}
      {chain.modules.map((module, index) => <div className="signal-module" key={module.id}>
        <div className="signal-module-row">
          <button className="signal-module-select" aria-expanded={chain.selected === module.id} onClick={() => chain.setSelected(chain.selected === module.id ? null : module.id)}><span className="signal-number">{String(index + 1).padStart(2, '0')}</span><span><strong>{names[module.kind]}</strong><small>{module.enabled ? t.active : t.bypassed}</small></span><ChevronDown size={16} className={chain.selected === module.id ? 'is-open' : ''} /></button>
          <div className="signal-actions">
            <button className="icon-button" aria-label={`${t.moveUp} ${names[module.kind]}`} disabled={index === 0} onClick={() => chain.move(module.id, -1)}><ArrowUp size={17} /></button>
            <button className="icon-button" aria-label={`${t.moveDown} ${names[module.kind]}`} disabled={index === chain.modules.length - 1} onClick={() => chain.move(module.id, 1)}><ArrowDown size={17} /></button>
            <button className="signal-module-toggle" role="switch" aria-label={`${t.enable} ${names[module.kind]}`} aria-checked={module.enabled} onClick={() => chain.toggle(module.id)}><span className="signal-switch" aria-hidden="true"><span /></span></button>
            <button className="icon-button" aria-label={`${t.remove} ${names[module.kind]}`} onClick={() => chain.remove(module.id)}><Trash2 size={17} /></button>
          </div>
        </div>
        {chain.selected === module.id && <div className="signal-parameters">{parameters[module.kind].map(parameter => <label key={parameter.key}><span>{parameterNames[parameter.key]}<output>{module.values[parameter.key]} {parameter.unit}</output></span><input type="range" min={parameter.min} max={parameter.max} step={parameter.step} value={module.values[parameter.key]} style={{ '--seek-position': `${(module.values[parameter.key] - parameter.min) / (parameter.max - parameter.min) * 100}%` } as CSSProperties} onChange={event => chain.update(module.id, parameter.key, Number(event.target.value))} /></label>)}</div>}
      </div>)}
    </div>
  </div>
}
