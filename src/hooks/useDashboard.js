import { useState, useEffect } from 'react'
import { getCallStats, getCallSessions } from '../api/callSessions'
import { useUser } from '../context/UserContext'

export function useDashboard() {
  const { userId } = useUser()
  const [stats, setStats] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    Promise.all([
      getCallStats(userId),
      getCallSessions(userId, 10)
    ])
      .then(([statsData, sessionsData]) => {
        setStats(statsData)
        setSessions(sessionsData.callSessions || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [userId])

  return { stats, sessions, loading, error }
}
