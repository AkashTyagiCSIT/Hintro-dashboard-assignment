import { useState, useRef, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import LogoutModal from '../modals/LogoutModal'
import styles from './Topbar.module.css'

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 1.5l8 4.5-8 4.5V1.5Z" fill="currentColor"/>
    </svg>
  )
}

export default function Topbar({ title, onMenuClick }) {
  const { profile, userId, setUserId } = useUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = profile
    ? `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()
    : '?'

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.left}>
          <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
            <HamburgerIcon />
          </button>
          <h1 className={styles.title}>{title}</h1>
        </div>

        <div className={styles.right}>
          <div className={styles.userToggle}>
            <button
              className={`${styles.toggleBtn} ${userId === 'u1' ? styles.toggleActive : ''}`}
              onClick={() => setUserId('u1')}
            >
              u1
            </button>
            <button
              className={`${styles.toggleBtn} ${userId === 'u2' ? styles.toggleActive : ''}`}
              onClick={() => setUserId('u2')}
            >
              u2
            </button>
          </div>

          <button className={styles.tutorialBtn}>
            <PlayIcon />
            Watch Tutorial
          </button>

          <div className={styles.avatarWrap} ref={dropdownRef}>
            <button
              className={styles.avatarBtn}
              onClick={() => setDropdownOpen(v => !v)}
              aria-expanded={dropdownOpen}
            >
              <div className={styles.avatar}>{initials}</div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => { setDropdownOpen(false); setLogoutOpen(true) }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M6 2H3a1 1 0 00-1 1v9a1 1 0 001 1h3M10 10l3-2.5L10 5M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
