export interface CountryMask {
  key: string
  name: string
  emoji: string
  prefix: string
  mask: string
}

export type DigitInputState = 'default' | 'error' | 'success' | 'disabled'
