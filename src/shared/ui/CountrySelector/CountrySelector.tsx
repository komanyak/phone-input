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
  'data-testid'?: string
}

export const CountrySelector = ({
  emoji,
  prefix,
  isOpen,
  onClick,
  state = 'default',
  disabled = false,
  'data-testid': dataTestId = 'country-selector'
}: CountrySelectorProps) => {
  return (
    <button
      className={`${styles.root} ${state !== 'default' ? styles[`root_${state}`] : ''} ${disabled ? styles.root_disabled : ''}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      data-testid={dataTestId}
    >
      <span className={styles.root__emoji}>{emoji}</span>
      <span className={styles.root__prefix}>{prefix}</span>
      <span className={`${styles.root__arrow} ${isOpen ? styles.root__arrow_up : ''}`}>
        <ArrowDownIcon />
      </span>
    </button>
  )
}
