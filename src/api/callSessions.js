import { BASE_URL } from './config'

export async function getCallStats(userId) {
  const res = await fetch(`${BASE_URL}/api/call-sessions/stats`, {
    headers: { 'x-user-id': userId }
  })
  if (!res.ok) throw new Error('Failed to fetch call stats')
  return res.json()
}

export async function getCallSessions(userId, limit = 10) {
  const res = await fetch(`${BASE_URL}/api/call-sessions?limit=${limit}`, {
    headers: { 'x-user-id': userId }
  })
  if (!res.ok) throw new Error('Failed to fetch call sessions')
  return res.json()
}
