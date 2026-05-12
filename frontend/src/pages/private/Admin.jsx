import { useState, useEffect } from 'react'
import api from '../../api'

export default function Admin() {
    let [users, setUsers] = useState([])
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [actionError, setActionError] = useState(null)

    //Carga la lista de usuarios al montar el componente
    function loadUsers() {
        api.get('/admin/users')
            .then((res) => setUsers(res.data))
            .catch(() => setError('No se pudo cargar la lista de usuarios.'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    //Banea un usuario y recarga la lista
    function handleBan(id) {
        setActionError(null)
        api.post(`/admin/users/${id}/ban`)
            .then(loadUsers)
            .catch((err) => setActionError(err.response?.data?.message ?? 'Error al banear el usuario.'))
    }

    //Desbanea un usuario y recarga la lista
    function handleUnban(id) {
        setActionError(null)
        api.post(`/admin/users/${id}/unban`)
            .then(loadUsers)
            .catch((err) => setActionError(err.response?.data?.message ?? 'Error al desbanear el usuario.'))
    }

    //Mensaje mientras carga
    if (loading) {
        return <div className="flex items-center justify-center h-64 text-sm animate-pulse">Cargando usuarios...</div>
    }

    //Mensaje si hay error
    if (error) {
        return <div className="flex items-center justify-center h-64 text-sm">{error}</div>
    }

    return (
        <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto py-6 lg:py-10 px-4 lg:px-8">
            <div className="shadow-black/50 shadow-lg bg-darker border border-white/10 rounded-xl p-4 lg:p-6 flex flex-col gap-4">
                <h1 className="text-primary font-bold text-lg lg:text-2xl uppercase tracking-widest text-center font-display">
                    Panel de administración
                </h1>
                <div className="h-px bg-white/10" />

                {/* Error de acción */}
                {actionError && <p className="text-red-400 text-xs text-center">{actionError}</p>}

                {/* Tabla de usuarios */}
                <div className="flex flex-col gap-2">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between gap-4 bg-dark border border-white/10 rounded-lg px-4 py-3"
                        >
                            {/* Info del usuario */}
                            <div className="flex flex-col gap-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold text-sm truncate">{user.name}</span>
                                    {user.role === 'admin' && (
                                        <span className="text-accent text-xs font-bold uppercase tracking-widest">
                                            Admin
                                        </span>
                                    )}
                                    {!!user.banned && (
                                        <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
                                            Baneado
                                        </span>
                                    )}
                                </div>
                                <span className="text-muted text-xs truncate">{user.email}</span>
                                {user.character && (
                                    <span className="text-muted text-xs">
                                        Nivel {user.character.level} · {user.character.gold} oro
                                    </span>
                                )}
                            </div>

                            {/* Botón ban/unban */}
                            {user.role !== 'admin' && (
                                <button
                                    onClick={() => (!!user.banned ? handleUnban(user.id) : handleBan(user.id))}
                                    className={`cursor-pointer shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded border transition-colors
                                        ${
                                            !!user.banned
                                                ? 'border-green-400/40 text-green-400 hover:bg-green-400/10'
                                                : 'border-red-400/40 text-red-400 hover:bg-red-400/10'
                                        }`}
                                >
                                    {!!user.banned ? 'Desbanear' : 'Banear'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
