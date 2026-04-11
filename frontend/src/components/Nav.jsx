import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    let [menuOpen, setMenuOpen] = useState(false)

    return (
        <header>
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-darker/70 border-b border-white/10 shadow-2xl transition-all duration-300">
                <div className="mx-auto flex items-center justify-between h-16 px-10">
                    {/* Logo + nombre */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <img src="/img/ui/Logo.png" alt="Logo IKUS" className="w-10 h-10 object-contain" />
                        <span className="font-display font-bold text-xl text-primary tracking-wider">PROYECTO IKUS</span>
                    </Link>

                    {/* Rutas desktop */}
                    <ul className="hidden md:flex items-center gap-4 list-none m-0">
                        <li>
                            <Link to="/" className="px-3 py-2 hover:text-accent transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="px-3 py-2 hover:text-accent transition-colors">
                                Contacto
                            </a>
                        </li>
                        <li className="text-white/20 mx-2 select-none">|</li>
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

                    {/* Botón hamburguesa */}
                    <button
                        className="md:hidden p-2 rounded text-primary focus:outline-none"
                        aria-label="Abrir menú"
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
                    className={`mobile-menu md:hidden bg-transparent border-t border-white/10 backdrop-blur-xl ${menuOpen ? 'menu-open' : ''}`}
                >
                    <div className="px-6 py-4 flex flex-col gap-2">
                        <Link
                            to="/"
                            className="py-2 text-primary hover:text-accent no-underline transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <a href="#" className="py-2 text-primary hover:text-accent no-underline transition-colors">
                            Contacto
                        </a>
                        <hr className="border-white/10 my-1" />
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
                    </div>
                </div>
            </nav>
        </header>
    )
}
