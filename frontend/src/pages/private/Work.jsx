import { useEffect, useState, useRef } from 'react'
import api from '../../api'

//Opciones de trabajo
let WORK_OPTIONS = [
    { label: '1 hora', seconds: 3600 },
    { label: '2 horas', seconds: 7200 },
    { label: '3 horas', seconds: 10800 },
    { label: '4 horas', seconds: 14400 },
    { label: '5 horas', seconds: 18000 },
    { label: '6 horas', seconds: 21600 },
    { label: '7 horas', seconds: 25200 },
    { label: '8 horas', seconds: 28800 },
    { label: '10 horas', seconds: 36000 },
    { label: '12 horas', seconds: 43200 },
    { label: '18 horas', seconds: 64800 },
    { label: '24 horas', seconds: 86400 },
    { label: '1 semana', seconds: 604800 },
]

//Convierte segundos a HH:MM:SS
function formatTime(seconds) {
    let s = Math.max(0, seconds)
    let h = Math.floor(s / 3600)
    let m = Math.floor((s % 3600) / 60)
    let sec = s % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function Work() {
    let [character, setCharacter] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)

    //Duración seleccionada en el select
    let [selectedDuration, setSelectedDuration] = useState(WORK_OPTIONS[0].seconds)

    //Segundos restantes para el countdown
    let [timeLeft, setTimeLeft] = useState(null)

    //Recompensas obtenidas al terminar
    let [rewards, setRewards] = useState(null)

    //Error de acción (start/finish)
    let [actionError, setActionError] = useState(null)

    let intervalRef = useRef(null)

    //Carga el personaje para saber si ya está trabajando
    useEffect(() => {
        api.get('/character')
            .then((res) => setCharacter(res.data))
            .catch(() => setError('No se pudo cargar el personaje.'))
            .finally(() => setLoading(false))
    }, [])

    //Arranca o sincroniza el countdown cuando el personaje está trabajando
    useEffect(() => {
        if (!character?.work_ends_at) {
            clearInterval(intervalRef.current)
            setTimeLeft(null)
            return
        }

        //Calcula tiempo restante en base a work_ends_at real
        function calcTimeLeft() {
            let endsAt = new Date(character.work_ends_at).getTime()
            return Math.round((endsAt - Date.now()) / 1000)
        }

        setTimeLeft(calcTimeLeft())

        intervalRef.current = setInterval(() => {
            let remaining = calcTimeLeft()
            setTimeLeft(remaining)

            //Cuando llega a cero para el intervalo pero no llama a finish automáticamente
            if (remaining <= 0) clearInterval(intervalRef.current)
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [character?.work_ends_at])

    async function handleStart() {
        setActionError(null)
        try {
            let res = await api.post('/work/start', { duration: selectedDuration })
            setCharacter(res.data)
            setRewards(null)
        } catch (err) {
            setActionError(err.response?.data?.message ?? 'Error al iniciar el trabajo.')
        }
    }

    async function handleFinish() {
        setActionError(null)
        try {
            let res = await api.post('/work/finish')
            setCharacter(res.data.character)
            setRewards({
                xp: res.data.xp_earned,
                gold: res.data.gold_earned,
                items: res.data.items_dropped,
            })
        } catch (err) {
            setActionError(err.response?.data?.message ?? 'Error al finalizar el trabajo.')
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-sm animate-pulse">Cargando...</div>
    }

    if (error || !character) {
        return (
            <div className="flex items-center justify-center h-64 text-sm">
                {error ?? 'Error al cargar el personaje.'}
            </div>
        )
    }

    let isWorking = !!character.work_ends_at
    let isDone = isWorking && timeLeft !== null && timeLeft <= 0

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto py-6 lg:py-10 px-4 lg:px-8 flex flex-col gap-6">
            <h1 className="text-primary font-bold text-lg lg:text-2xl uppercase tracking-widest text-center font-display">
                Trabajar
            </h1>

            {/* Panel principal */}
            <div className="bg-darker border border-white/10 rounded-xl shadow-black/50 shadow-lg p-6 lg:p-8 flex flex-col gap-6">
                {/* Estado: sin trabajar */}
                {!isWorking && !rewards && (
                    <div className="flex flex-col gap-4">
                        <p className="text-muted text-sm text-center">
                            Elige cuánto tiempo quieres trabajar. Puedes parar en cualquier momento y recibirás las
                            recompensas proporcionales al tiempo transcurrido.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                            <select
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                                className="bg-dark border border-white/20 text-primary rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent/60 w-full sm:w-auto"
                            >
                                {WORK_OPTIONS.map((opt) => (
                                    <option key={opt.seconds} value={opt.seconds}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleStart}
                                className="bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-bold text-sm uppercase tracking-widest rounded-lg px-6 py-2 transition-colors w-full sm:w-auto"
                            >
                                Trabajar
                            </button>
                        </div>
                    </div>
                )}

                {/* Estado: trabajando */}
                {isWorking && (
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-muted text-sm">Tu personaje está trabajando...</p>

                        {/* Countdown */}
                        <div className="text-accent font-bold text-5xl lg:text-6xl font-display tracking-widest tabular-nums">
                            {timeLeft !== null ? formatTime(timeLeft) : '--:--:--'}
                        </div>

                        <button
                            onClick={handleFinish}
                            className="bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-bold text-sm uppercase tracking-widest rounded-lg px-6 py-2 transition-colors"
                        >
                            {isDone ? 'Recoger recompensas' : 'Dejar de trabajar'}
                        </button>
                    </div>
                )}

                {/* Estado: recompensas recibidas */}
                {!isWorking && rewards && (
                    <div className="flex flex-col gap-5">
                        <h2 className="text-primary font-bold text-sm lg:text-base uppercase tracking-widest text-center">
                            ¡Trabajo completado!
                        </h2>

                        {/* XP y oro */}
                        <div className="flex gap-3 justify-center">
                            <div className="flex flex-col items-center gap-1 bg-dark border border-white/10 rounded-lg py-3 px-6">
                                <span className="text-muted text-xs uppercase tracking-widest">XP</span>
                                <span className="text-accent font-bold text-2xl">+{rewards.xp}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 bg-dark border border-white/10 rounded-lg py-3 px-6">
                                <span className="text-muted text-xs uppercase tracking-widest">Oro</span>
                                <span className="text-accent font-bold text-2xl">+{rewards.gold}</span>
                            </div>
                        </div>

                        {/* Ítems */}
                        {rewards.items.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <span className="text-primary text-xs uppercase tracking-widest text-center">
                                    Ítems obtenidos
                                </span>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {rewards.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="bg-dark border border-white/10 rounded-lg px-3 py-2 text-xs flex flex-col items-center gap-1 min-w-20"
                                        >
                                            <span className="text-primary font-bold">{item.name}</span>
                                            <span className={rarityColor(item.rarity)}>{item.rarity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {rewards.items.length === 0 && (
                            <p className="text-muted text-xs text-center">Sin ítems esta vez.</p>
                        )}

                        <button
                            onClick={() => setRewards(null)}
                            className="bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-bold text-sm uppercase tracking-widest rounded-lg px-6 py-2 transition-colors self-center"
                        >
                            Volver a trabajar
                        </button>
                    </div>
                )}

                {/* Error de acción */}
                {actionError && <p className="text-red-400 text-xs text-center">{actionError}</p>}
            </div>
        </div>
    )
}

//Color según rareza del ítem
function rarityColor(rarity) {
    let colors = {
        common: 'text-muted',
        rare: 'text-blue-400',
        epic: 'text-purple-400',
        legendary: 'text-amber-400',
    }
    return colors[rarity] ?? 'text-muted'
}
