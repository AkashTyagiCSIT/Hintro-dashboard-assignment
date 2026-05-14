import { BASE_URL } from './config'

export async function getDashboard(userId) {
  const res = await fetch(`${BASE_URL}/api/auth/dashboard`, {
    headers: { 'x-user-id': userId }
  })
  if (!res.ok) throw new Error('Failed to fetch dashboard')
  return res.json()
}
