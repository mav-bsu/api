import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import UserContextProvider from './components/UserContextProvider'
import RequireAuth from './components/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
])

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}
