import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import type { Messages } from './en'

const dictionaries = { en } satisfies Record<string, Messages>
export type Locale = keyof typeof dictionaries
const MessagesContext = createContext<Messages>(en)

export function LanguageProvider({ locale = 'en', children }: { locale?: Locale; children: ReactNode }) {
  useEffect(() => { document.documentElement.lang = locale }, [locale])
  return <MessagesContext.Provider value={dictionaries[locale]}>{children}</MessagesContext.Provider>
}

export function useMessages() { return useContext(MessagesContext) }
