import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = localStorage.getItem('userId')

    if (!id) {
      setLoading(false)
      return
    }

    fetch(`http://localhost:5001/users?id=${id}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem('userId', user.id)
    }
  }, [user?.id])

  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
