import styles from './CountryItem.module.scss'

export type CountryItemProps = {
  emoji: string
  prefix: string
  name: string
  onClick?: () => void
  isActive?: boolean
}

export const CountryItem = ({ emoji, prefix, name, onClick, isActive }: CountryItemProps) => {
  return (
    <div 
      className={`${styles.countryItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="option"
      aria-selected={isActive}
    >
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.prefix}>{prefix}</span>
      <span className={styles.name}>{name}</span>
    </div>
  )
}
