import { useUser } from '../context/UserContext'
import { useDashboard } from '../hooks/useDashboard'
import Layout from '../components/layout/Layout'
import StatCard from '../components/dashboard/StatCard'
import RecentCalls from '../components/dashboard/RecentCalls'
import { formatDuration } from '../utils/formatDuration'
import { formatRelativeDate } from '../utils/formatDate'
import styles from './DashboardPage.module.css'

function TotalSessionsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 4l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
    </svg>
  )
}

function DurationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 8v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 2.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 12l-4 2.5 1.5-4.5L4 7.5h4.5L10 3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="15" cy="5" r="1.5" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  )
}

function LastSessionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 12h2v2H7z" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  )
}

export default function DashboardPage() {
  const { profile } = useUser()
  const { stats, sessions, loading } = useDashboard()

  const firstName = profile?.firstName || 'Name'

  const totalSessions = stats?.totalSessions ?? 0
  const avgDuration = stats?.averageDuration ?? 0
  const aiInteractions = stats?.totalAIInteractions ?? 0
  const lastSessionDate = stats?.lastSession?.[0] ?? null

  return (
    <Layout title="Dashboard">
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.greeting}>Hi, {firstName} 👋 Welcome to Hintro</h2>
            <p className={styles.subtitle}>Ready to make your next call smarter ?</p>
          </div>
          <button className={styles.newCallBtn}>Start New Call</button>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            icon={<TotalSessionsIcon />}
            label="Total Sessions"
            value={totalSessions === 0 ? '0' : totalSessions}
            colorClass="red"
          />
          <StatCard
            icon={<DurationIcon />}
            label="Average Duration"
            value={avgDuration === 0 ? '0' : formatDuration(avgDuration)}
            colorClass="teal"
          />
          <StatCard
            icon={<AIIcon />}
            label="AI Used"
            value={aiInteractions === 0 ? '0' : `${aiInteractions} times`}
            colorClass="green"
          />
          <StatCard
            icon={<LastSessionIcon />}
            label="Last Session"
            value={lastSessionDate ? formatRelativeDate(lastSessionDate) : '-'}
            colorClass="purple"
          />
        </div>

        <RecentCalls sessions={sessions} loading={loading} />
      </div>
    </Layout>
  )
}
