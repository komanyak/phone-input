import { PhoneInput } from '@components/PhoneInput'
import { COUNTRY_MASKS } from '@shared/constants/countries'
import styles from './App.module.scss'

function App() {
  const handlePhoneChange = (value: string) => {
    console.log('Phone changed:', value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.title}>Default</h2>
        <PhoneInput
          masks={COUNTRY_MASKS}
          onChange={handlePhoneChange}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>With Value</h2>
        <PhoneInput
          masks={COUNTRY_MASKS}
          value="+71234567890"
          onChange={handlePhoneChange}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Error</h2>
        <PhoneInput
          masks={COUNTRY_MASKS}
          value="+7 (987) 654 - 32 - 10"
          state="error"
          onChange={handlePhoneChange}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Success</h2>
        <PhoneInput
          masks={COUNTRY_MASKS}
          value="79998887766"
          state="success"
          onChange={handlePhoneChange}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Disabled</h2>
        <PhoneInput
          masks={COUNTRY_MASKS}
          value="+7 555 444 33 22"
          disabled={true}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  )
}

export default App
