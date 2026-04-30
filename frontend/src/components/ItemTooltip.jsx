let RARITY_COLORS = {
    common: 'text-muted',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-amber-400',
}

//Tooltip con la info completa de un item
export default function ItemTooltip({ item, visible }) {
    if (!visible) return null

    return (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-dark border border-white/20 rounded-lg p-3 flex flex-col gap-2 shadow-xl shadow-black/60 pointer-events-none">
            {/* Nombre + imagen */}
            <div className="flex items-center justify-between gap-2">
                <span className={`font-bold text-sm leading-tight ${RARITY_COLORS[item.rarity]}`}>{item.name}</span>
                <div className="w-10 h-10 shrink-0 bg-darker border border-white/10 rounded flex items-center justify-center text-muted text-xs text-center leading-tight">
                    {item.slot}
                </div>
            </div>

            {/* Rareza y slot */}
            <div className="flex flex-col gap-0.5">
                <span className={`text-xs font-bold uppercase tracking-widest ${RARITY_COLORS[item.rarity]}`}>
                    {item.rarity}
                </span>
                <span className="text-muted text-xs capitalize">{item.slot}</span>
            </div>

            {/* Separador */}
            <div className="h-px bg-white/10" />

            {/* Stats */}
            <div className="flex flex-col gap-1">
                {item.attack > 0 && (
                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Ataque</span>
                        <span className="text-primary font-bold">+{item.attack}</span>
                    </div>
                )}
                {item.defense > 0 && (
                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Defensa</span>
                        <span className="text-primary font-bold">+{item.defense}</span>
                    </div>
                )}
                {item.health > 0 && (
                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Vida</span>
                        <span className="text-primary font-bold">+{item.health}</span>
                    </div>
                )}
            </div>

            {/* Descripción */}
            {item.description && <p className="text-muted text-xs italic leading-tight">{item.description}</p>}

            {/* Nivel */}
            <div className="h-px bg-white/10" />
            <span className="text-muted text-xs">
                Nivel: <span className="text-primary font-bold">{item.required_level}</span>
            </span>
        </div>
    )
}
