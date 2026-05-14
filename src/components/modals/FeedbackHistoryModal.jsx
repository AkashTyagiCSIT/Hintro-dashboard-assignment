import styles from './Modal.module.css'
import feedbackStyles from './FeedbackModal.module.css'

export default function FeedbackHistoryModal({ open, onClose }) {
  if (!open) return null

  const history = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.modalWide}`} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Feedback History</h2>

        {history.length === 0 ? (
          <p className={styles.body} style={{ textAlign: 'center', padding: '24px 0' }}>
            No feedback submitted yet.
          </p>
        ) : (
          <div className={feedbackStyles.historyList}>
            {history.map(item => (
              <div key={item.id} className={feedbackStyles.historyItem}>
                <div className={feedbackStyles.historyHeader}>
                  <span className={feedbackStyles.historyStars}>
                    {[1,2,3,4,5].map(r => (
                      <span key={r} style={{ color: r <= item.rating ? '#f59e0b' : '#e5e7eb' }}>★</span>
                    ))}
                  </span>
                  <span className={feedbackStyles.historyDate}>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                </div>
                <p className={feedbackStyles.historyMessage}>{item.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions} style={{ marginTop: 8 }}>
          <button className={styles.confirm} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
