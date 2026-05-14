import { useState } from 'react'
import { formatGroupDate, formatCallTime } from '../../utils/formatDate'
import styles from './RecentCalls.module.css'

function groupByDate(sessions) {
  const groups = {}
  sessions.forEach(s => {
    const key = formatGroupDate(s.started_at)
    if (!groups[key]) groups[key] = []
    groups[key].push(s)
  })
  return Object.entries(groups)
}

function getAvatarColor(client) {
  const colors = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626', '#0891b2']
  let hash = 0
  for (let i = 0; i < client.length; i++) hash = client.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function CallRow({ session }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const initial = (session.client || 'U')[0].toUpperCase()
  const color = getAvatarColor(session.client || 'U')
  const participantCount = session.participants?.length || 0

  return (
    <div className={styles.callRow}>
      <div className={styles.callLeft}>
        <div className={styles.callAvatar} style={{ background: color }}>
          {initial}
        </div>
        <div className={styles.callInfo}>
          <span className={styles.callTitle}>{session.description || 'Call'}</span>
          <span className={styles.callParticipants}>
            {'•'.repeat(Math.min(participantCount, 5))}
          </span>
        </div>
      </div>
      <div className={styles.callRight}>
        <span className={styles.callTime}>{formatCallTime(session.started_at)}</span>
        <div className={styles.menuWrap}>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="More options"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="3.5" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="8" cy="12.5" r="1.2" fill="currentColor"/>
            </svg>
          </button>
          {menuOpen && (
            <div className={styles.menu}>
              <button className={styles.menuItem} onClick={() => setMenuOpen(false)}>View details</button>
              <button className={styles.menuItem} onClick={() => setMenuOpen(false)}>View transcript</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/>
          <path d="M10 12h12M10 16h8M10 20h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
        </svg>
      </div>
      <p className={styles.emptyTitle}>No Recent Calls</p>
      <p className={styles.emptySubtitle}>
        Connect your Google Calendar to see upcoming meetings,<br />
        get reminders, and join calls directly from Hintro.
      </p>
      <button className={styles.startBtn}>Start a Call</button>
    </div>
  )
}

export default function RecentCalls({ sessions, loading }) {
  if (loading) {
    return (
      <div className={styles.wrap}>
        <h2 className={styles.heading}>Recent calls</h2>
        <div className={styles.loadingState}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </div>
    )
  }

  const grouped = groupByDate(sessions)

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Recent calls</h2>
      {sessions.length === 0 ? (
        <div className={styles.emptyWrap}>
          <EmptyState />
        </div>
      ) : (
        <div className={styles.list}>
          {grouped.map(([date, items]) => (
            <div key={date}>
              <p className={styles.dateLabel}>{date}</p>
              {items.map(s => <CallRow key={s._id} session={s} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
