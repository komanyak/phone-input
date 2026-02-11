import styles from './CountryItem.module.scss'

export type CountryItemProps = {
  emoji: string
  prefix: string
  name: string
  onClick?: () => void
  isActive?: boolean
  'data-testid'?: string
}

export const CountryItem = ({ emoji, prefix, name, onClick, isActive, 'data-testid': dataTestId }: CountryItemProps) => {
  return (
    <div
      className={`${styles.root} ${isActive ? styles.root_active : ''}`}
      onClick={onClick}
      role="option"
      aria-selected={isActive}
      data-testid={dataTestId}
    >
      <span className={styles.root__emoji}>{emoji}</span>
      <span className={styles.root__prefix}>{prefix}</span>
      <span className={styles.root__name}>{name}</span>
    </div>
  )
}
