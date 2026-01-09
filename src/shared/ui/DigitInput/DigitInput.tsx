import { forwardRef, type InputHTMLAttributes } from 'react'
import type { DigitInputState } from '@shared/types'
import styles from './DigitInput.module.scss'

type DigitInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  state?: DigitInputState
}

export const DigitInput = forwardRef<HTMLInputElement, DigitInputProps>(
  ({ state = 'default', className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        maxLength={1}
        disabled={disabled}
        className={`${styles.digitInput} ${styles[state]} ${disabled ? styles.disabled : ''} ${className || ''}`}
        {...props}
      />
    )
  }
)

DigitInput.displayName = 'DigitInput'
