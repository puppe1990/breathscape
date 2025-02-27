import type { Translation } from "./types"
import { en } from "./en"
import { ptBR } from "./pt-BR"

export const translations: { [key: string]: Translation } = {
  en,
  "pt-BR": ptBR,
}

export const defaultTranslation = translations["en"]

export type { Translation }

