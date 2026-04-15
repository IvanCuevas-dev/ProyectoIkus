import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'

export default function Registro() {
    let { register } = useContext(AuthContext)
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState(null)
    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await register({ name, email, password })
            navigate('/profile')
        } catch (err) {
            let errors = err.response?.data?.errors
            if (errors?.name) {
                setError('El nombre de personaje ya está en uso')
            } else if (errors?.email) {
                setError('El correo electrónico ya está registrado')
            } else if (errors?.password) {
                setError('La contraseña debe tener al menos 8 caracteres')
            } else {
                setError('Error al registrarse, inténtalo de nuevo')
            }
        }
    }

    return (
        <main className="flex-1 flex flex-col items-center px-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full max-w-md py-12">
                {/** Texto principal */}
                <div className="text-center mb-6">
                    <h1 className="font-display font-bold text-4xl text-white tracking-[0.2em] mb-3 uppercase">
                        Registro
                    </h1>
                    <p className="text-muted text-base italic">
                        Todo gran viaje comienza con una decisión. Regístrate y entra en IKUS.
                    </p>
                </div>

                {/** Formulario */}
                <div className="w-full bg-darker/40 border border-white/5 p-8 rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/** Usuario */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm text-accent tracking-widest mb-2 text-center"
                            >
                                Usuario
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre de tu personaje"
                                required
                                autoFocus
                                className="w-full px-4 py-3 rounded bg-dark border border-white/10 text-primary text-base placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition"
                            />
                        </div>

                        {/** Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm text-accent tracking-widest mb-2 text-center"
                            >
                                Correo electrónico
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="usuario@ikus.com"
                                required
                                className="w-full px-4 py-3 rounded bg-dark border border-white/10 text-primary text-base placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition"
                            />
                        </div>

                        {/** Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm text-accent tracking-widest mb-2 text-center"
                            >
                                Contraseña
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded bg-dark border border-white/10 text-primary text-base focus:outline-none focus:border-accent/50 transition"
                            />
                        </div>

                        {/** Error */}
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        {/** Botón */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full mt-2 py-3 font-bold tracking-widest border border-accent text-accent rounded-sm hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(202,178,99,0.3)] transition"
                        >
                            CREAR CUENTA
                        </button>
                    </form>

                    {/** Link */}
                    <p className="text-center text-muted text-sm mt-8">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-accent hover:underline tracking-wider">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>

            {/** Logo + divisor */}
            <div className="flex-1 min-h-12" />
            <div className="flex items-center justify-center w-full max-w-lg">
                <div className="h-px flex-1 bg-linear-to-r from-transparent to-accent/40" />
                <img src="/img/ui/Logo.png" alt="Logo IKUS" className="w-16 h-16 object-contain mx-4" />
                <div className="h-px flex-1 bg-linear-to-l from-transparent to-accent/40" />
            </div>
            <div className="flex-1 min-h-12" />
        </main>
    )
}
