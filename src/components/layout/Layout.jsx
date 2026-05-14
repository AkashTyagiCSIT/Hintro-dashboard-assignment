import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import styles from './Layout.module.css'

export default function Layout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={styles.root}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className={styles.main}>
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
