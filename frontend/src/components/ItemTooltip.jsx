let RARITY_COLORS = {
    common: 'text-muted',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-amber-400',
}

let RARITY_BORDERS = {
    common: 'border-white/20',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-amber-400',
}

//Tooltip con la info completa de un item
export default function ItemTooltip({ item, visible }) {
    if (!visible) return null

    return (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-48 sm:w-56 lg:w-64 bg-dark border border-white/20 rounded-lg p-4 flex flex-col gap-2 shadow-xl shadow-black/60 pointer-events-none">
            {/* Nombre + imagen */}
            <div className="flex items-center justify-between gap-2">
                <span className={`font-bold text-base leading-tight ${RARITY_COLORS[item.rarity]}`}>{item.name}</span>
                {item.image
                    ? <img src={item.image} alt={item.name} className="w-10 h-10 object-contain shrink-0" />
                    : <span className="text-muted text-xs text-center leading-tight shrink-0">{item.slot}</span>
                }
            </div>

            {/* Nivel y slot */}
            <div className="flex items-center justify-between text-muted text-sm">
                <span>Nivel {item.required_level}</span>
                <span className="capitalize">{item.slot}</span>
            </div>

            {/* Separador */}
            <div className="h-px bg-white/10" />

            {/* Stats */}
            <div className="flex flex-col gap-1">
                {item.attack > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Ataque</span>
                        <span className="text-green-400 font-bold">+{item.attack}</span>
                    </div>
                )}
                {item.defense > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Defensa</span>
                        <span className="text-green-400 font-bold">+{item.defense}</span>
                    </div>
                )}
                {item.health > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Vida</span>
                        <span className="text-green-400 font-bold">+{item.health}</span>
                    </div>
                )}
            </div>

            <div className="h-px bg-white/10" />

            {/* Descripción */}
            {item.description && <p className="text-muted text-sm italic leading-tight">{item.description}</p>}

            {/* Rareza */}
            <div className="h-px bg-white/10" />
            <span className={`text-sm font-bold capitalize ${RARITY_COLORS[item.rarity]}`}>{item.rarity}</span>
        </div>
    )
}
