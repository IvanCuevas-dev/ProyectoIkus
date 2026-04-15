import { createContext, useState } from 'react'
import api from '../api'

let AuthContext = createContext()

//Comparte estados globales con los demas componentes
function AuthProvider({ children }) {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
    let [token, setToken] = useState(localStorage.getItem('token'))

    async function register(data) {
        let response = await api.post('/register', data)
        setUser(response.data.user)
        setToken(response.data.token)

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
    }

    async function login(data) {
        let response = await api.post('/login', data)
        setUser(response.data.user)
        setToken(response.data.token)

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
    }

    function logout() {
        setUser(null)
        setToken(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return <AuthContext.Provider value={{ user, token, register, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
