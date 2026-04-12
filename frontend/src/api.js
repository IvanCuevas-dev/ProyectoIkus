import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: { Accept: 'application/json' },
})

// Añade el token en cada petición si existe
api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

//  Redirige al login si el token es inválido
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && window.location.pathname !== '/login') {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
