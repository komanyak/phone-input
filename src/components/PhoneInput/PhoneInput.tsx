import styles from './PhoneInput.module.scss'

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
}

export const PhoneInput = ({ value = '', onChange }: PhoneInputProps) => {
  return (
    <div className={styles.phoneInput}>
      {/* PhoneInput component */}
    </div>
  )
}
