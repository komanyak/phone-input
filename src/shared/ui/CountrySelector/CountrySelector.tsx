import { ArrowDownIcon } from '@shared/assets'
import type { DigitInputState } from '@shared/types'
import styles from './CountrySelector.module.scss'

type CountrySelectorProps = {
  emoji: string
  prefix: string
  isOpen: boolean
  onClick: () => void
  state?: DigitInputState
  disabled?: boolean
}

export const CountrySelector = ({ 
  emoji, 
  prefix, 
  isOpen, 
  onClick, 
  state = 'default',
  disabled = false 
}: CountrySelectorProps) => {
  return (
    <button 
      className={`${styles.countrySelector} ${styles[state]} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.prefix}>{prefix}</span>
      <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
        <ArrowDownIcon />
      </span>
    </button>
  )
}
