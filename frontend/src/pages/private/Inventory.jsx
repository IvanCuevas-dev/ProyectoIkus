import { useState, useEffect } from 'react'
import api from '../../api'
import ItemTooltip from '../../components/ItemTooltip'

export default function Inventory() {
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [inventory, setInventory] = useState([])
    let [hoveredId, setHoveredId] = useState(null)

    //Carga el inventario al montar el componente
    useEffect(() => {
        api.get('/inventory')
            .then((res) => setInventory(res.data))
            .catch(() => setError('No se pudo acceder al inventario.'))
            .finally(() => setLoading(false))
    }, [])

    //Mensaje mientras carga
    if (loading) {
        return <div className="flex items-center justify-center h-64 text-sm animate-pulse">Cargando inventario...</div>
    }

    //Mensaje si hay error
    if (error) {
        return <div className="flex items-center justify-center h-64 text-sm">{error}</div>
    }

    return (
        <>
            <p>Inventario</p>

            <div className="flex flex-wrap gap-2">
                {inventory.map((entry) => (
                    <div
                        key={entry.item_id}
                        className="relative cursor-pointer bg-dark border border-white/10 rounded-lg text-sm flex flex-col items-center justify-center gap-1 w-20 h-20"
                        onMouseEnter={() => setHoveredId(entry.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <span className="text-primary font-bold text-center leading-tight">{entry.item.name}</span>
                        <span className="text-muted">x{entry.quantity}</span>
                        <ItemTooltip item={entry.item} visible={hoveredId === entry.id} />
                    </div>
                ))}
            </div>
        </>
    )
}
