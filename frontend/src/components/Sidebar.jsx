import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Sidebar() {
    let { user } = useContext(AuthContext)
    let location = useLocation()

    let links = [
        { to: '/dashboard', label: 'Inicio' },
        { to: '/work', label: 'Trabajar' },
        { to: '/shop', label: 'Mercader' },
        { to: '/ranking', label: 'Clasificación' },
    ]

    return (
        <aside className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-52 bg-darker border-r border-white/10 flex-col py-6 px-4 gap-6 rounded-xl overflow-y-auto">
            {/* Usuario */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <span className="text-primary font-bold tracking-wider text-sm">{user?.name}</span>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`px-3 py-2 rounded text-sm transition-colors no-underline
                            ${
                                location.pathname === link.to
                                    ? 'bg-accent/10 text-accent font-bold border-r-2 border-accent'
                                    : 'text-muted hover:text-primary hover:bg-white/5'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
