import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import FeedbackModal from '../modals/FeedbackModal'
import FeedbackHistoryModal from '../modals/FeedbackHistoryModal'
import styles from './Sidebar.module.css'

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.4"/>
    <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'call-insights', label: 'Call Insights', icon: <CallIcon /> },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: <KbIcon />, info: true },
  { id: 'prompts', label: 'Prompts', icon: <PromptsIcon />, info: true },
  { id: 'boxy-controls', label: 'Boxy Controls', icon: <BoxyIcon />, info: true },
]

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  )
}

function CallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4.5C2 3.4 2.9 2.5 4 2.5h.5c.4 0 .8.3.9.7l.8 2.4c.1.4 0 .8-.3 1L4.7 7.3C5.4 8.8 6.7 10 8.2 10.8l.7-1.3c.2-.3.6-.4 1-.3l2.4.8c.4.1.7.5.7.9V11.5c0 1.1-.9 2-2 2h-.5C5.4 13.5 2 10.1 2 5.5v-1Z" fill="currentColor"/>
    </svg>
  )
}

function KbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function PromptsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M4.5 6l2 2-2 2M8.5 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BoxyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  return (
    <>
      {mobileOpen && <div className={styles.mobileOverlay} onClick={onMobileClose} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Hintro</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${item.id === 'dashboard' ? styles.active : ''}`}
              onClick={item.id !== 'dashboard' ? undefined : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.info && <span className={styles.infoIcon}><InfoIcon /></span>}
            </button>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button className={styles.bottomItem} onClick={() => { setHistoryOpen(true); onMobileClose?.() }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span>Feedback History</span>
          </button>

          <button className={styles.bottomItem} onClick={() => { setFeedbackOpen(true); onMobileClose?.() }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 7h7M4.5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span>Feedback</span>
          </button>

          <button className={styles.upgrade}>Upgrade</button>
        </div>
      </aside>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <FeedbackHistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </>
  )
}
