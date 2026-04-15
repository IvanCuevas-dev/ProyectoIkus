import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

//Recibe la página para privatizar la ruta
export default function PrivateRoute({ children }) {
    let { token } = useContext(AuthContext)

    if (!token) return <Navigate to="/login" replace />

    return children
}
