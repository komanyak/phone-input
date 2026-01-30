import { makeAutoObservable } from 'mobx'
import type { CountryMask, DigitInputState } from '@shared/types'

export class PhoneInputStore {
  digits: string[] = []
  selectedCountry: CountryMask
  isDropdownOpen = false
  masks: CountryMask[]
  inputRefs: (HTMLInputElement | null)[] = []
  state: DigitInputState = 'default'
  validationOverride: 'error' | 'success' | null = null

  private onChangeCallback?: (value: string) => void

  constructor(
    masks: CountryMask[],
    initialValue?: string,
    onChange?: (value: string) => void,
    state: DigitInputState = 'default'
  ) {
    this.masks = masks
    this.selectedCountry = masks[0]
    this.onChangeCallback = onChange
    this.state = state
    
    makeAutoObservable(this, {
      inputRefs: false, 
    })

    this.initializeDigits()

    if (initialValue) {
      this.parseAndSetValue(initialValue)
    }
  }

  get effectiveState(): DigitInputState {
    return this.validationOverride ?? this.state
  }

  get isFilled(): boolean {
    return this.digits
      .slice(0, this.totalDigits)
      .every((d) => d !== '' && d !== undefined)
  }

  validate(): boolean {
    return this.isFilled
  }

  setValidationResult(result: 'error' | 'success') {
    this.validationOverride = result
  }


  get maskGroups(): number[] {
    return this.getMaskGroups(this.selectedCountry.mask)
  }

  get totalDigits(): number {
    return this.maskGroups.reduce((sum, count) => sum + count, 0)
  }

  get formattedValue(): string {
    const prefix = this.selectedCountry.prefix
    const mask = this.selectedCountry.mask
    let formattedValue = prefix + ' '
    let digitIndex = 0

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '*') {
        if (digitIndex < this.digits.length && this.digits[digitIndex]) {
          formattedValue += this.digits[digitIndex]
          digitIndex++
        } else {
          break
        }
      } else {
        formattedValue += mask[i]
      }
    }

    return formattedValue.trim()
  }


  setDigit(index: number, value: string) {
    const digitValue = value.replace(/\D/g, '')
    
    if (index >= 0 && index < this.totalDigits) {
      this.digits[index] = digitValue
      this.validationOverride = null

      if (this.onChangeCallback) {
        this.onChangeCallback(this.formattedValue)
      }

      if (digitValue && index < this.totalDigits - 1) {
        this.focusInput(index + 1)
      }
    }
  }

  selectCountry(country: CountryMask) {
    this.selectedCountry = country
    this.isDropdownOpen = false
    this.initializeDigits()
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  closeDropdown() {
    this.isDropdownOpen = false
  }

  handleBackspace(index: number) {
    if (!this.digits[index] && index > 0) {
      this.focusInput(index - 1)
    }
  }

  handleArrowLeft(index: number) {
    if (index > 0) {
      this.focusInput(index - 1)
    }
  }

  handleArrowRight(index: number) {
    if (index < this.totalDigits - 1) {
      this.focusInput(index + 1)
    }
  }

  private initializeDigits() {
    this.digits = new Array(this.totalDigits).fill('')
    this.inputRefs = new Array(this.totalDigits).fill(null)
  }

  private getMaskGroups(mask: string): number[] {
    const groups: number[] = []
    let currentGroup = 0

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '*') {
        currentGroup++
      } else if (currentGroup > 0) {
        groups.push(currentGroup)
        currentGroup = 0
      }
    }
    
    if (currentGroup > 0) {
      groups.push(currentGroup)
    }

    return groups
  }

  setInputRef(index: number, ref: HTMLInputElement | null) {
    this.inputRefs[index] = ref
  }

  focusInput(index: number) {
    const input = this.inputRefs[index]
    if (input) {
      input.focus()
      requestAnimationFrame(() => {
        const len = input.value.length
        input.setSelectionRange(len, len)
      })
    }
  }


  setValue(value: string) {
    this.parseAndSetValue(value)
  }

  private parseAndSetValue(value: string) {
    const digitsOnly = value.replace(/\D/g, '')
    const prefix = this.selectedCountry.prefix.replace(/\D/g, '')
    let phoneDigits = digitsOnly

    if (digitsOnly.startsWith(prefix)) {
      phoneDigits = digitsOnly.slice(prefix.length)
    }

    for (let i = 0; i < this.totalDigits; i++) {
      this.digits[i] = phoneDigits[i] ?? ''
    }
  }
}
