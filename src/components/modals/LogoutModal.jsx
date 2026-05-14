import styles from './Modal.module.css'

export default function LogoutModal({ open, onClose }) {
  if (!open) return null

  function handleLogout() {
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Leaving already?</h2>
        <p className={styles.body}>
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.confirm} onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  )
}
