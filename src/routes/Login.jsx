import React, { useContext, useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const userContext = useContext(UserContext)

  const navigate = useNavigate()

  function handleLogin() {
    // TODO: validate data
    const query = new URLSearchParams({ email, password }).toString()
    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          userContext.onChange(user)
          navigate('/')
        } else {
          setError('Invalid user')
        }
      })
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>Login</h1>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
