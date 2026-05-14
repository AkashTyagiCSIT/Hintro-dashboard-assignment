export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}sec`
  if (s === 0) return `${m}m`
  return `${m}m ${s}sec`
}
