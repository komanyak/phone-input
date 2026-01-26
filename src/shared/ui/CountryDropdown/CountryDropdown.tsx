import { CountryItem } from '../CountryItem'
import type { CountryMask } from '@shared/types'
import styles from './CountryDropdown.module.scss'

type CountryDropdownProps = {
  countries: CountryMask[]
  selectedKey?: string
  onSelect: (country: CountryMask) => void
  isOpen: boolean
}

export const CountryDropdown = ({ 
  countries, 
  selectedKey, 
  onSelect,
  isOpen 
}: CountryDropdownProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.root} role="listbox">
      <div className={styles.root__scrollContainer}>
        {countries.map((country) => (
          <CountryItem
            key={country.key}
            emoji={country.emoji}
            prefix={country.prefix}
            name={country.name}
            isActive={country.key === selectedKey}
            onClick={() => onSelect(country)}
          />
        ))}
      </div>
    </div>
  )
}
