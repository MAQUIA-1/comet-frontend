import { useRef, useState } from 'react'

export type ModuleKind = 'gain' | 'eq' | 'crossfeed'
type Parameters = Record<string, number>
type ChainModule = { id: number; kind: ModuleKind; enabled: boolean; values: Parameters }

// Example values for UI interaction only; they do not describe an audio engine.
export const moduleDefaults: Record<ModuleKind, Parameters> = {
  gain: { gain: 0 },
  eq: { frequency: 1000, gain: 0, q: 1 },
  crossfeed: { amount: 30 },
}

export function useSignalChain() {
  const nextId = useRef(0)
  const [modules, setModules] = useState<ChainModule[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [bypassed, setBypassed] = useState(true)
  const add = (kind: ModuleKind) => {
    const id = nextId.current++
    setModules(items => [...items, { id, kind, enabled: true, values: { ...moduleDefaults[kind] } }])
    setSelected(id)
  }
  const remove = (id: number) => {
    setModules(items => items.filter(item => item.id !== id))
    setSelected(value => value === id ? null : value)
  }
  const toggle = (id: number) => setModules(items => items.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item))
  const move = (id: number, direction: -1 | 1) => setModules(items => {
    const index = items.findIndex(item => item.id === id)
    const target = index + direction
    if (index < 0 || target < 0 || target >= items.length) return items
    const next = [...items]; [next[index], next[target]] = [next[target], next[index]]
    return next
  })
  const update = (id: number, key: string, value: number) => setModules(items => items.map(item => item.id === id ? { ...item, values: { ...item.values, [key]: value } } : item))
  return { modules, selected, setSelected, bypassed, setBypassed, add, remove, toggle, move, update }
}
export type SignalChainState = ReturnType<typeof useSignalChain>
