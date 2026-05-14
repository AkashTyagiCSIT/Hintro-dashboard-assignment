import { BASE_URL } from './config'

export async function getProfile(userId) {
  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    headers: { 'x-user-id': userId }
  })
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}
