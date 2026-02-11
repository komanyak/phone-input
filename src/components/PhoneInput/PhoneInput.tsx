import { useRef, useEffect, useMemo, useCallback, type ReactElement } from 'react'
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
  const lastEmittedValueRef = useRef<string | null>(null)

  const wrappedOnChange = useCallback(
    (v: string) => {
      lastEmittedValueRef.current = v
      onChange?.(v)
    },
    [onChange]
  )

  const store = useMemo(
    () => new PhoneInputStore(masks, value ?? '', wrappedOnChange, state),
    [masks, wrappedOnChange, state]
  )

  useEffect(() => {
    if (value === undefined) return
    if (value === lastEmittedValueRef.current) {
      lastEmittedValueRef.current = null
      return
    }
    lastEmittedValueRef.current = null
    store.setValue(value)
  }, [value, store])

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
            state={store.effectiveState}
            disabled={disabled}
            data-testid={`digit-${currentIndex}`}
            onChange={(e) => {
              if (!disabled) {
                store.setDigit(currentIndex, e.target.value)
              }
            }}
            onFocus={(e) => {
              requestAnimationFrame(() => {
                const input = e.target
                const len = input.value.length
                input.setSelectionRange(len, len)
              })
            }}
            onKeyDown={(e) => {
              if (disabled) return
              if (e.key === 'Enter') {
                e.preventDefault()
                store.setValidationResult(store.validate() ? 'success' : 'error')
              } else if (e.key === 'Backspace') {
                store.handleBackspace(currentIndex)
              } else if (e.key === 'Delete') {
                e.preventDefault()
                store.setDigit(currentIndex, '')
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                store.handleArrowLeft(currentIndex)
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
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
    <div className={styles.root} ref={containerRef} data-testid="phone-input">
      <div className={styles.root__input}>
        <CountrySelector
          emoji={store.selectedCountry.emoji}
          prefix={store.selectedCountry.prefix}
          isOpen={store.isDropdownOpen}
          state={store.effectiveState}
          disabled={disabled}
          onClick={() => !disabled && store.toggleDropdown()}
          data-testid="country-selector"
        />
        
        {renderPhoneInputs()}
      </div>

      <CountryDropdown
        countries={store.masks}
        selectedKey={store.selectedCountry.key}
        onSelect={(country) => !disabled && store.selectCountry(country)}
        isOpen={store.isDropdownOpen && !disabled}
        data-testid="country-dropdown"
      />
    </div>
  )
})
