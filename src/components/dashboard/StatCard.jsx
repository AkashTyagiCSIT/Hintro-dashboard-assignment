import styles from './StatCard.module.css'

export default function StatCard({ icon, label, value, colorClass }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrap} ${styles[colorClass]}`}>
        {icon}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  )
}
