import { useRef, useEffect, useMemo, type ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { DigitInput, CountrySelector, CountryDropdown } from '@shared/ui'
import type { CountryMask, DigitInputState } from '@shared/types'
import { PhoneInputStore } from './PhoneInput.store'
import styles from './PhoneInput.module.scss'

type PhoneInputProps = {
  masks: CountryMask[]
  value?: string
  onChange?: (value: string) => void
  state?: DigitInputState
  disabled?: boolean
}

export const PhoneInput = observer(({ masks, value, onChange, state = 'default', disabled = false }: PhoneInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const store = useMemo(
    () => new PhoneInputStore(masks, value, onChange, state),
    [masks, value, onChange, state]
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        store.closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [store])

  const renderPhoneInputs = () => {
    let digitIndex = 0
    const elements: ReactElement[] = []

    store.maskGroups.forEach((groupSize, groupIndex) => {
      const groupInputs: ReactElement[] = []

      if (groupIndex === 0) {
        elements.push(
          <span key="open-bracket" className={styles.root__separator}>(</span>
        )
      }

      for (let i = 0; i < groupSize; i++) {
        const currentIndex = digitIndex
        groupInputs.push(
          <DigitInput
            key={currentIndex}
            ref={(el) => store.setInputRef(currentIndex, el)}
            value={store.digits[currentIndex] || ''}
            state={store.state}
            disabled={disabled}
            onChange={(e) => {
              if (!disabled) {
                store.setDigit(currentIndex, e.target.value)
              }
            }}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === 'Backspace') {
                store.handleBackspace(currentIndex)
              } else if (e.key === 'ArrowLeft') {
                store.handleArrowLeft(currentIndex)
              } else if (e.key === 'ArrowRight') {
                store.handleArrowRight(currentIndex)
              }
            }}
          />
        )
        digitIndex++
      }

      elements.push(
        <div key={`group-${groupIndex}`} className={styles.root__digitGroup}>
          {groupInputs}
        </div>
      )

      if (groupIndex === 0) {
        elements.push(
          <span key="close-bracket" className={styles.root__separator}>)</span>
        )
      }

      if (groupIndex < store.maskGroups.length - 1) {
        elements.push(
          <span key={`sep-${groupIndex}`} className={styles.root__separator}>-</span>
        )
      }
    })

    return elements
  }

  return (
    <div className={styles.root} ref={containerRef}>
      <div className={styles.root__input}>
        <CountrySelector
          emoji={store.selectedCountry.emoji}
          prefix={store.selectedCountry.prefix}
          isOpen={store.isDropdownOpen}
          state={store.state}
          disabled={disabled}
          onClick={() => !disabled && store.toggleDropdown()}
        />
        
        {renderPhoneInputs()}
      </div>

      <CountryDropdown
        countries={store.masks}
        selectedKey={store.selectedCountry.key}
        onSelect={(country) => !disabled && store.selectCountry(country)}
        isOpen={store.isDropdownOpen && !disabled}
      />
    </div>
  )
})
