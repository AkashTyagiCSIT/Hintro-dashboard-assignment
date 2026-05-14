export function formatRelativeDate(isoString) {
  if (!isoString) return '-'
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 30) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  if (diffDays >= 1) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  if (diffHours >= 1) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffMinutes >= 1) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
  return 'just now'
}

export function formatGroupDate(isoString) {
  const date = new Date(isoString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const suffix = getOrdinal(day)
  return `${month} ${day}${suffix}`
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export function formatCallTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
}
