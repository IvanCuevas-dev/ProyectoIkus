import { useEffect, useState } from 'react'
import api from '../../api'

let XP_PER_LEVEL = 100

function StatBar({ label, value, max, color = 'bg-accent' }) {
    let pct = Math.min(100, Math.round((value / max) * 100))
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-muted">
                <span>{label}</span>
                <span className="text-primary font-bold">
                    {value}
                    {max !== value ? ` / ${max}` : ''}
                </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

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

    useEffect(() => {
        api.get('/character')
            .then((res) => setCharacter(res.data))
            .catch(() => setError('No se encontró ningún personaje.'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-muted text-sm">Cargando personaje...</div>
    }

    if (error || !character) {
        return (
            <div className="flex items-center justify-center h-64 text-muted text-sm">
                {error ?? 'Sin personaje asignado.'}
            </div>
        )
    }

    let xpForNext = character.level * XP_PER_LEVEL
    let xpProgress = character.experience % XP_PER_LEVEL

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6 px-4">
            {/* Cabecera */}
            <div className="flex items-center gap-5 bg-darker border border-white/10 rounded-xl p-5">
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-3xl font-display">
                        {character.name?.[0]?.toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary font-bold text-2xl font-display tracking-wide">{character.name}</h1>
                    <span className="text-accent text-sm font-bold tracking-widest uppercase">
                        Nivel {character.level}
                    </span>
                    <span className="text-muted text-xs">
                        Oro: <span className="text-accent font-bold">{character.gold.toLocaleString()}</span> ⚜
                    </span>
                </div>
            </div>

            {/* Progresión */}
            <div className="bg-darker border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <h2 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2">
                    Progresión
                </h2>
                <StatBar
                    label={`Experiencia — próximo nivel: ${xpForNext - xpProgress} XP`}
                    value={xpProgress}
                    max={XP_PER_LEVEL}
                    color="bg-accent"
                />
            </div>

            {/* Stats base */}
            <div className="bg-darker border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <h2 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2">
                    Estadísticas
                </h2>
                <div className="grid grid-cols-4 gap-3">
                    <StatCard label="HP" value={character.health} />
                    <StatCard label="Ataque" value={character.attack} />
                    <StatCard label="Defensa" value={character.defense} />
                    <StatCard label="Nivel" value={character.level} />
                </div>
            </div>
        </div>
    )
}
