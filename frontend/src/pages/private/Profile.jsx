import { useEffect, useState } from 'react'
import api from '../../api'

//Tarjeta de estadística
function StatCard({ label, value }) {
    return (
        <div className="flex flex-col items-center gap-1 lg:gap-2 bg-dark border border-white/10 rounded-lg py-3 lg:py-4 px-2 flex-1">
            <span className="text-muted text-xs lg:text-sm uppercase tracking-widest">{label}</span>
            <span className="text-accent font-bold text-xl lg:text-2xl">{value}</span>
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

    //Calcula progreso XP dentro del nivel actual
    let xpNextLvl = character.experience_next_lvl
    let xpPerLevel = xpNextLvl / character.level
    let xpPrevLvl = xpNextLvl - xpPerLevel
    let xpInLevel = character.experience - xpPrevLvl
    let xpPct = Math.min(100, Math.round((xpInLevel / xpPerLevel) * 100))

    //Sprite según nivel
    let TOTAL_SPRITES = 2
    let spriteIndex = Math.min(Math.floor(character.level / 10) + 1, TOTAL_SPRITES)
    let sprite = `/img/character/pj-${spriteIndex}.png`

    return (
        <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto py-6 lg:py-10 lg:px-8 px-4 ">
            <div className="shadow-black/50 shadow-lg bg-darker border border-white/10 rounded-xl p-4 lg:p-6 flex flex-col sm:flex-row gap-4 lg:gap-6">
                {/* Contenido */}
                <div className="flex flex-col gap-4 lg:gap-6 flex-1 min-w-0">
                    {/* Usuario */}
                    <div className="flex items-center justify-center gap-3 lg:gap-4">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center shrink-0">
                            <span className="text-accent font-bold text-xl lg:text-2xl font-display">
                                {character.name?.[0]?.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-primary font-bold text-sm lg:text-xl uppercase tracking-widest">
                                {character.name}
                            </h2>
                            <span className="text-accent text-xs lg:text-sm font-bold tracking-widest">
                                Nivel {character.level}
                            </span>
                            <span className="flex items-center gap-2 text-xs lg:text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-4 h-4 lg:w-5 lg:h-5 shrink-0"
                                >
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

                    {/* Divisor */}
                    <div className="h-px bg-white/10" />

                    {/* Estadísticas */}
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <span className="text-primary font-bold text-sm lg:text-base uppercase tracking-widest text-center">
                            Estadísticas
                        </span>
                        <div className="flex gap-2 lg:gap-3">
                            <StatCard label="HP" value={character.health} />
                            <StatCard label="Ataque" value={character.attack} />
                            <StatCard label="Defensa" value={character.defense} />
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Progresión */}
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <span className="text-primary font-bold text-sm lg:text-base uppercase tracking-widest text-center">
                            Progresión
                        </span>
                        <div className="flex justify-between text-xs lg:text-sm text-muted">
                            <span>
                                Experiencia: <span className="text-accent font-bold">{character.experience}</span>
                            </span>
                            <span>
                                Siguiente nivel:{' '}
                                <span className="text-accent font-bold">{xpNextLvl - character.experience}</span>
                            </span>
                        </div>
                        <div className="h-2 lg:h-3 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent rounded-full transition-all"
                                style={{ width: `${xpPct}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Divisor */}
                <div className="h-px sm:h-auto sm:w-px bg-white/10 sm:self-stretch" />

                {/* Sprite */}
                <div className="flex flex-col items-center justify-center shrink-0 sm:w-36 lg:w-52 xl:w-64">
                    <img
                        src={sprite}
                        alt="Sprite del personaje"
                        className="w-3/4 sm:w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] brightness-110"
                    />
                    <div className="w-1/2 h-3 rounded-full bg-black/50 blur-md -mt-5" />
                </div>
            </div>
        </div>
    )
}
