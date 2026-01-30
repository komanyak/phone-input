import { useState } from 'react'
import { PhoneInput } from '@components/PhoneInput'
import { COUNTRY_MASKS } from '@shared/constants/countries'
import styles from './App.module.scss'

function App() {
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [phone, setPhone] = useState('')

  const handlePhoneChange = (value: string) => {
    setPhone(value)
  }

  return (
    <div className={styles.root}>
      <form
        className={styles.root__form}
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className={styles.root__title}>Ввод данных</h2>

        <div className={styles.root__field}>
          <label className={styles.root__label} htmlFor="surname">
            Фамилия
          </label>
          <input
            id="surname"
            type="text"
            className={styles.root__input}
            placeholder="Иванов"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className={styles.root__field}>
          <label className={styles.root__label} htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            type="text"
            className={styles.root__input}
            placeholder="Иван"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.root__field}>
          <label className={styles.root__label} htmlFor="patronymic">
            Отчество
          </label>
          <input
            id="patronymic"
            type="text"
            className={styles.root__input}
            placeholder="Иванович"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
        </div>

        <div className={styles.root__field}>
          <label className={styles.root__label}>Телефон</label>
          <PhoneInput
            masks={COUNTRY_MASKS}
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

      
      </form>
    </div>
  )
}

export default App
