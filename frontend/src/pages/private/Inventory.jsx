import { useState, useEffect, useRef } from 'react'
import api from '../../api'
import ItemTooltip from '../../components/ItemTooltip'

//Hook para detectar toque largo en móvil
//Muestra el tooltip al tocar y equipa/desequipa al mantener
function useLongPress(onLongPress) {
    let [touched, setTouched] = useState(false)
    //useRef guarda el temporizador sin provocar re-renders
    let timer = useRef(null)

    function handleTouchStart() {
        setTouched(true)
        timer.current = setTimeout(() => {
            onLongPress()
            setTouched(false)
        }, 600)
    }

    function handleTouchEnd() {
        clearTimeout(timer.current)
        setTouched(false)
    }

    return { touched, handleTouchStart, handleTouchEnd }
}

let TOTAL_SPRITES = 2
let LEFT_SLOTS = ['yelmo', 'armadura', 'botas']
let RIGHT_SLOTS = ['arma', 'anillo']
let SLOT_LABELS = { yelmo: 'Yelmo', armadura: 'Armadura', botas: 'Botas', arma: 'Arma', anillo: 'Anillo' }

//Tarjeta de estadísticas del personaje
function StatCard({ label, value }) {
    return (
        <div className="flex flex-col items-center gap-1 lg:gap-2 bg-dark border border-white/10 rounded-lg py-3 lg:py-4 px-2 flex-1 lg:flex-none lg:w-32">
            <span className="text-muted text-xs lg:text-sm uppercase tracking-widest">{label}</span>
            <span className="text-accent font-bold text-xl lg:text-2xl">{value}</span>
        </div>
    )
}

//Slot de equipamiento
//Hover o toque muestra el tooltip, doble click o toque largo desequipa
function SlotBox({ slot, equipped, onUnequip, characterLevel }) {
    let [hovered, setHovered] = useState(false)
    let { touched, handleTouchStart, handleTouchEnd } = useLongPress(() => equipped && onUnequip(slot))

    return (
        <div
            className="relative cursor-pointer w-20 h-20 bg-dark border border-white/10 rounded-lg flex flex-col items-center justify-center gap-1"
            //Si está vacío no hace nada al hacer doble click
            onDoubleClick={() => equipped && onUnequip(slot)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {equipped ? (
                <>
                    {equipped.item.image ? (
                        <img src={equipped.item.image} alt={equipped.item.name} className="w-10 h-10 object-contain" />
                    ) : (
                        <span className="text-primary font-bold text-center leading-tight text-xs">
                            {equipped.item.name}
                        </span>
                    )}
                    <ItemTooltip item={equipped.item} visible={hovered || touched} characterLevel={characterLevel} />
                </>
            ) : (
                <span className="text-muted text-xs text-center leading-tight px-1">{SLOT_LABELS[slot]}</span>
            )}
        </div>
    )
}

//Tarjeta de item del inventario
//Hover o toque muestra el tooltip, doble click o toque largo equipa
function ItemCard({ entry, onEquip, characterLevel }) {
    let [hovered, setHovered] = useState(false)
    let { touched, handleTouchStart, handleTouchEnd } = useLongPress(() => onEquip(entry.item_id))

    return (
        <div
            className="relative cursor-pointer bg-dark border border-white/10 rounded-lg text-sm flex flex-col items-center justify-center w-20 h-20"
            onDoubleClick={() => onEquip(entry.item_id)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {entry.item.image ? (
                <img src={entry.item.image} alt={entry.item.name} className="w-10 h-10 object-contain" />
            ) : (
                <span className="text-primary font-bold text-center leading-tight text-xs">{entry.item.name}</span>
            )}
            {/*Cantidad del item en el inventario*/}
            <span className="text-muted text-xs">x{entry.quantity}</span>
            <ItemTooltip item={entry.item} visible={hovered || touched} characterLevel={characterLevel} />
        </div>
    )
}

export default function Inventory() {
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [inventory, setInventory] = useState([])
    let [equipment, setEquipment] = useState({})
    let [character, setCharacter] = useState(null)
    //Error de acción (equipar/desequipar)
    let [actionError, setActionError] = useState(null)

    //Carga inventario, equipamiento y personaje en paralelo
    function loadData() {
        Promise.all([api.get('/inventory'), api.get('/equipment'), api.get('/character')])
            .then(([invRes, eqRes, charRes]) => {
                setInventory(invRes.data)
                //Objeto para acceder al equipamiento mediante el slot
                let eqMap = {}
                eqRes.data.forEach((e) => (eqMap[e.slot] = e))
                setEquipment(eqMap)
                setCharacter(charRes.data)
            })
            .catch(() => setError('No se pudo cargar el inventario.'))
            .finally(() => setLoading(false))
    }

    //Carga los datos al montar el componente
    useEffect(() => {
        loadData()
    }, [])

    //Equipa un item y recarga los datos
    function handleEquip(itemId) {
        setActionError(null)
        api.post('/equipment/equip', { item_id: itemId })
            .then(loadData)
            .catch((err) => setActionError(err.response?.data?.message ?? 'Error al equipar el ítem.'))
    }

    //Desequipa un item y recarga los datos
    function handleUnequip(slot) {
        setActionError(null)
        api.delete(`/equipment/unequip/${slot}`)
            .then(loadData)
            .catch((err) => setActionError(err.response?.data?.message ?? 'Error al desequipar el ítem.'))
    }

    //Mensaje mientras carga
    if (loading) {
        return <div className="flex items-center justify-center h-64 text-sm animate-pulse">Cargando inventario...</div>
    }

    //Mensaje si hay error
    if (error) {
        return <div className="flex items-center justify-center h-64 text-sm">{error}</div>
    }

    //Sprite según nivel del personaje
    let spriteIndex = Math.min(Math.floor(character.level / 10) + 1, TOTAL_SPRITES)
    let sprite = `/img/character/pj-${spriteIndex}.png`

    return (
        <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto py-6 lg:py-10 px-4 lg:px-8 flex flex-col gap-4">
            {/* Panel equipamiento */}
            <div className="shadow-black/50 shadow-lg bg-darker border border-white/10 rounded-xl p-4 lg:p-6 flex flex-col gap-4">
                <h1 className="text-primary font-bold text-lg lg:text-2xl uppercase tracking-widest text-center font-display">
                    Equipamiento
                </h1>
                <div className="h-px bg-white/10" />

                {/* Slots izquierda + sprite + slots derecha */}
                <div className="flex items-center justify-center gap-4 lg:px-16">
                    {/* Columna izquierda: yelmo, armadura, botas */}
                    <div className="flex flex-col gap-2">
                        {LEFT_SLOTS.map((slot) => (
                            <SlotBox
                                key={slot}
                                slot={slot}
                                equipped={equipment[slot]}
                                onUnequip={handleUnequip}
                                characterLevel={character.level}
                            />
                        ))}
                    </div>

                    {/* Sprite del personaje */}
                    <div className="flex flex-col items-center justify-center flex-1">
                        <img
                            src={sprite}
                            alt="Sprite del personaje"
                            className="h-28 lg:h-64 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] brightness-110"
                        />
                        {/* Sombra bajo los pies */}
                        <div className="w-16 h-3 rounded-full bg-black/50 blur-md -mt-3" />
                    </div>

                    {/* Columna derecha: arma, anillo */}
                    <div className="flex flex-col gap-2">
                        {RIGHT_SLOTS.map((slot) => (
                            <SlotBox
                                key={slot}
                                slot={slot}
                                equipped={equipment[slot]}
                                onUnequip={handleUnequip}
                                characterLevel={character.level}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* Stats del personaje */}
                <div className="flex gap-2 lg:gap-6 lg:justify-center">
                    <StatCard label="HP" value={character.health} />
                    <StatCard label="Ataque" value={character.attack} />
                    <StatCard label="Defensa" value={character.defense} />
                </div>

                {/* Error al equipar/desequipar */}
                {actionError && <p className="text-red-400 text-xs text-center">{actionError}</p>}
            </div>

            {/* Panel inventario */}
            <div className="shadow-black/50 shadow-lg bg-darker border border-white/10 rounded-xl p-4 lg:p-6 flex flex-col gap-4">
                <h1 className="text-primary font-bold text-lg lg:text-2xl uppercase tracking-widest text-center font-display">
                    Inventario
                </h1>
                <div className="h-px bg-white/10" />
                {/* Grid de items del inventario */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {inventory.map((entry) => (
                        <ItemCard key={entry.id} entry={entry} onEquip={handleEquip} characterLevel={character.level} />
                    ))}
                </div>
            </div>
        </div>
    )
}
