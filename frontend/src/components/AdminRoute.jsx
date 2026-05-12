import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

//Redirige a /profile si el usuario no es admin
export default function AdminRoute({ children }) {
    let { user, token } = useContext(AuthContext)

    if (!token) return <Navigate to="/login" replace />
    if (user?.role !== 'admin') return <Navigate to="/profile" replace />

    return children
}
