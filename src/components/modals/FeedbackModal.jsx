import { useState } from 'react'
import styles from './Modal.module.css'
import feedbackStyles from './FeedbackModal.module.css'

const RATINGS = [1, 2, 3, 4, 5]

export default function FeedbackModal({ open, onClose }) {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  function handleSubmit() {
    if (!message.trim()) return
    const entry = {
      id: Date.now(),
      rating,
      message: message.trim(),
      createdAt: new Date().toISOString()
    }
    const existing = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    localStorage.setItem('hintro_feedback', JSON.stringify([entry, ...existing]))
    setSubmitted(true)
  }

  function handleClose() {
    setRating(0)
    setMessage('')
    setSubmitted(false)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className={feedbackStyles.success}>
            <div className={feedbackStyles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#f0fdf4"/>
                <path d="M10 16l4 4 8-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.title}>Thank you!</h2>
            <p className={styles.body}>Your feedback has been saved.</p>
            <button className={styles.confirm} onClick={handleClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Share your feedback</h2>
            <p className={styles.body}>Help us improve Hintro with your thoughts.</p>

            <div className={feedbackStyles.ratingWrap}>
              <p className={feedbackStyles.ratingLabel}>How would you rate your experience?</p>
              <div className={feedbackStyles.stars}>
                {RATINGS.map(r => (
                  <button
                    key={r}
                    className={`${feedbackStyles.star} ${r <= rating ? feedbackStyles.starActive : ''}`}
                    onClick={() => setRating(r)}
                    aria-label={`Rate ${r} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className={feedbackStyles.fieldWrap}>
              <label className={feedbackStyles.fieldLabel}>Your feedback</label>
              <textarea
                className={feedbackStyles.textarea}
                placeholder="What's working well? What could be better?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.actions}>
              <button className={styles.cancel} onClick={handleClose}>Cancel</button>
              <button
                className={styles.confirm}
                onClick={handleSubmit}
                disabled={!message.trim()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
