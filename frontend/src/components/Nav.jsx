import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Nav() {
    let [menuOpen, setMenuOpen] = useState(false)
    let { token, user, logout } = useContext(AuthContext)
    let navigate = useNavigate()
    let location = useLocation()

    let links = [
        { to: '/work', label: 'Trabajar', icon: '/img/icons/trabajar.png' },
        { to: '/shop', label: 'Mercader', icon: '/img/icons/mercader.png' },
        { to: '/ranking', label: 'Clasificación', icon: '/img/icons/clasificacion.png' },
    ]

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <header>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenuOpen(false)}
            />

            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[linear-gradient(180deg,#0f1320_0%,#1e2440_50%,#0d1018_100%)] border-b border-accent/20 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_1px_0_rgba(202,178,99,0.08)]">
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
                                    to="/profile"
                                    className="px-3 py-2 hover:text-accent transition-colors no-underline"
                                >
                                    Perfil
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 hover:text-accent transition-colors cursor-pointer"
                            >
                                Logout
                                <img src="/img/icons/logout.png" alt="Logout" className="w-7 h-7 object-contain" />
                            </button>
                        </div>
                    ) : (
                        <ul className="hidden md:flex items-center gap-4">
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
                        className="md:hidden p-2 rounded text-primary cursor-pointer"
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
                <div
                    className={`fixed top-0 right-0 h-screen w-[75vw] max-w-75 z-50 overflow-y-auto transition-transform duration-300 md:hidden bg-[linear-gradient(180deg,#0f1320_0%,#1e2440_50%,#0d1018_100%)] border-l border-accent/20 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Botón cerrar */}
                    <button
                        className="absolute top-4 right-4 p-2 hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="px-6 py-8 flex flex-col gap-2 h-full">
                        {token ? (
                            <>
                                {/* Avatar + nombre */}
                                <Link
                                    to="/profile"
                                    className="flex flex-col items-center gap-2 mb-4 no-underline group"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors">
                                        <span className="text-accent uppercase font-bold text-xl font-display">
                                            {user?.name?.[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="font-bold tracking-widest text-md group-hover:text-accent transition-colors">
                                        {user?.name}
                                    </span>
                                </Link>

                                {/* Separador */}
                                <div className="h-px bg-accent/40 my-2" />

                                {/* Links con login */}
                                {links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-3 py-2 px-3 rounded no-underline transition-colors text-sm
                                            ${
                                                location.pathname === link.to
                                                    ? 'text-accent font-bold border-r-2 border-accent bg-accent/10'
                                                    : 'hover:text-primary hover:bg-white/5'
                                            }`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <img src={link.icon} alt={link.label} className="w-7 h-7 object-contain shrink-0" />
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Logout al fondo */}
                                <div className="flex-1" />
                                <div className="h-px bg-accent/40 my-2" />
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setMenuOpen(false)
                                    }}
                                    className="flex items-center gap-3 py-2 px-3 hover:text-primary hover:bg-white/5 text-left text-sm rounded cursor-pointer transition-colors"
                                >
                                    <img src="/img/icons/logout.png" alt="Logout" className="w-7 h-7 object-contain" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Links sin login */}
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
