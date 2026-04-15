import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Nav() {
    let [menuOpen, setMenuOpen] = useState(false)
    let { token, user, logout } = useContext(AuthContext)
    let navigate = useNavigate()
    let location = useLocation()

    let links = [
        { to: '/dashboard', label: 'Inicio' },
        { to: '/work', label: 'Trabajar' },
        { to: '/shop', label: 'Mercader' },
        { to: '/ranking', label: 'Clasificación' },
    ]

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <header>
            {/* Overlay */}
            <div className={`menu-overlay ${menuOpen ? 'menu-open' : ''}`} onClick={() => setMenuOpen(false)} />

            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-darker/70 border-b border-white/10 shadow-2xl transition-all duration-300">
                <div className="mx-auto flex items-center justify-between h-16 px-10">
                    {/* Logo + nombre */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <img src="/img/ui/Logo.png" alt="Logo IKUS" className="w-10 h-10 object-contain" />
                        <span className="font-display font-bold text-xl text-primary tracking-wider">
                            PROYECTO IKUS
                        </span>
                    </Link>

                    {/* Desktop */}
                    {token ? (
                        <div className="hidden md:flex items-center gap-4">
                            {location.pathname === '/' && (
                                <Link
                                    to="/dashboard"
                                    className="px-3 py-2 hover:text-accent transition-colors no-underline"
                                >
                                    Inicio
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 hover:text-accent transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className="hidden md:flex items-center gap-4 list-none m-0">
                            <li>
                                <Link to="/login" className="px-3 py-2 hover:text-accent transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/registro"
                                    className="px-3 py-2 font-bold tracking-widest border border-accent text-accent rounded-sm hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(202,178,99,0.3)] transition-all duration-300"
                                >
                                    Registro
                                </Link>
                            </li>
                        </ul>
                    )}

                    {/* Botón hamburguesa */}
                    <button
                        className="md:hidden p-2 rounded text-primary focus:outline-none cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menú móvil */}
                <div className={`mobile-menu md:hidden ${menuOpen ? 'menu-open' : ''}`}>
                    <div className="px-6 py-8 flex flex-col gap-2">
                        {token ? (
                            <>
                                {/* Avatar + nombre */}
                                <Link
                                    to="/profile"
                                    className="flex flex-col items-center gap-2 mb-4 no-underline cursor-pointer"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center hover:border-accent transition-colors">
                                        <span className="text-accent font-bold text-lg">
                                            {user?.name?.[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-primary font-bold tracking-wider text-sm">{user?.name}</span>
                                </Link>

                                {/* Separador */}
                                <div className="h-px bg-accent/40 mb-2" />

                                {/* Links */}
                                {links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`py-2 px-3 rounded no-underline transition-colors text-sm
                                            ${
                                                location.pathname === link.to
                                                    ? 'text-accent font-bold border-r-2 border-accent bg-accent/10'
                                                    : 'text-muted hover:text-primary hover:bg-white/5'
                                            }`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Separador */}
                                <div className="h-px bg-accent/40 mt-2 mb-2" />

                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setMenuOpen(false)
                                    }}
                                    className="py-2 px-3 text-muted hover:text-primary hover:bg-white/5 text-left text-sm rounded cursor-pointer transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="py-2 text-primary hover:text-accent no-underline transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/registro"
                                    className="py-2 text-accent font-bold no-underline"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
