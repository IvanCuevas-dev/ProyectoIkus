import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Sidebar() {
    let { user } = useContext(AuthContext)
    let location = useLocation()

    let links = [
        { to: '/work', label: 'Trabajar' },
        { to: '/shop', label: 'Mercader' },
        { to: '/ranking', label: 'Clasificación' },
    ]

    return (
        <aside className="hidden md:flex fixed top-16 left-0 bottom-14 w-52 z-10 flex-col py-6 px-4 gap-6 rounded-r-xl overflow-y-auto border-r border-accent/20 shadow-[inset_-1px_0_30px_rgba(0,0,0,0.4)] bg-[linear-gradient(180deg,#0f1320_0%,#1e2440_50%,#0d1018_100%)]">
            {/* Usuario */}
            <Link to="/profile" className="flex flex-col items-center gap-2 no-underline group">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors">
                    <span className="text-accent uppercase font-bold text-xl font-display">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <span className="font-bold tracking-wider text-sm group-hover:text-accent transition-colors font-display">
                    {user?.name}
                </span>
            </Link>

            {/* Divisor */}
            <div className="h-px bg-accent/20" />

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
                                    : 'hover:text-primary hover:bg-white/5'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
