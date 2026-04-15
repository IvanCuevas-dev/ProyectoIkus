import { useEffect, useState } from 'react'
import api from '../../api'

//XP necesaria por nivel
let XP_PER_LEVEL = 3000

//Tarjeta de estadística individual
function StatCard({ label, value }) {
    return (
        <div className="flex flex-col items-center gap-1 bg-dark border border-white/10 rounded-lg py-3 px-4">
            <span className="text-muted text-xs uppercase tracking-widest">{label}</span>
            <span className="text-accent font-bold text-xl">{value}</span>
        </div>
    )
}

export default function Profile() {
    let [character, setCharacter] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)

    //Carga el personaje del usuario autenticado
    useEffect(() => {
        api.get('/character')
            .then((res) => setCharacter(res.data))
            .catch(() => setError('No se encontró ningún personaje.'))
            .finally(() => setLoading(false))
    }, [])

    //Mensaje mientras carga
    if (loading) {
        return <div className="flex items-center justify-center h-64 text-sm animate-pulse">Cargando personaje...</div>
    }

    //Si falla la API muestro error para que no rompa
    if (error || !character) {
        return (
            <div className="flex items-center justify-center h-64 text-sm">
                {error ?? 'Error al cargar el personaje.'}
            </div>
        )
    }

    //Calcula XP para el siguiente nivel y progreso actual
    let xpForNext = character.level * XP_PER_LEVEL
    let xpProgress = character.experience % XP_PER_LEVEL
    let xpPct = Math.min(100, Math.round((xpProgress / XP_PER_LEVEL) * 100))

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6 px-4">
            {/* Usuario */}
            <div className="flex items-center gap-5 bg-darker border border-white/10 rounded-xl p-5">
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-3xl font-display">
                        {character.name?.[0]?.toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    {/* Nombre */}
                    <h1 className="text-primary font-bold text-2xl font-display tracking-wide">{character.name}</h1>
                    {/* Nivel */}
                    <span className="text-accent text-sm font-bold tracking-widest uppercase">
                        Nivel {character.level}
                    </span>
                    {/* SVG + Oro */}
                    <span className="flex items-center gap-1 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4">
                            <ellipse cx="13" cy="13" rx="5" ry="3" fill="#b45309" />
                            <rect x="8" y="10" width="10" height="3" fill="#b45309" rx="1" />
                            <ellipse cx="13" cy="10" rx="5" ry="3" fill="#f59e0b" />
                            <ellipse cx="7" cy="11" rx="5" ry="3" fill="#92400e" />
                            <rect x="2" y="8" width="10" height="3" fill="#92400e" rx="1" />
                            <ellipse cx="7" cy="8" rx="5" ry="3" fill="#fbbf24" />
                            <ellipse cx="7" cy="8" rx="3" ry="1.5" fill="#fde68a" opacity="0.6" />
                        </svg>
                        <span className="text-accent font-bold">{character.gold}</span>
                    </span>
                </div>
            </div>

            {/* Progresión */}
            <div className="bg-darker border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <h2 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2">
                    Progresión
                </h2>
                {/* Barra de experiencia */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-muted">
                        <span>Experiencia — Próximo nivel: {xpForNext - xpProgress} XP</span>
                        <span className="text-primary font-bold">
                            {xpProgress} / {XP_PER_LEVEL}
                        </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${xpPct}%` }} />
                    </div>
                </div>
            </div>

            {/* Stats base */}
            <div className="bg-darker border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <h2 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2">
                    Estadísticas
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    <StatCard label="HP" value={character.health} />
                    <StatCard label="Ataque" value={character.attack} />
                    <StatCard label="Defensa" value={character.defense} />
                </div>
            </div>
        </div>
    )
}
