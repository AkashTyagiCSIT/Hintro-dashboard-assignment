import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '../api/profile'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [userId, setUserId] = useState('u2')
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    setProfileLoading(true)
    getProfile(userId)
      .then(setProfile)
      .catch(console.error)
      .finally(() => setProfileLoading(false))
  }, [userId])

  return (
    <UserContext.Provider value={{ userId, setUserId, profile, profileLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
