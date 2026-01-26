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
      className={`${styles.root} ${isActive ? styles.root_active : ''}`}
      onClick={onClick}
      role="option"
      aria-selected={isActive}
    >
      <span className={styles.root__emoji}>{emoji}</span>
      <span className={styles.root__prefix}>{prefix}</span>
      <span className={styles.root__name}>{name}</span>
    </div>
  )
}
