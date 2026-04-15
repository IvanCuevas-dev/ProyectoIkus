import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'

export default function Login() {
    let { login } = useContext(AuthContext)
    let navigate = useNavigate()

    let [name, setName] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login({ name, password })
            navigate('/dashboard')
        } catch (err) {
            setError('Credenciales incorrectas')
        }
    }

    return (
        <main className="flex-1 flex flex-col items-center px-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full max-w-md py-12">
                {/** Texto principal */}
                <div className="text-center mb-6">
                    <h1 className="font-display font-bold text-4xl text-white tracking-[0.2em] mb-3 uppercase">
                        Iniciar sesión
                    </h1>
                    <p className="text-muted text-base italic">
                        Accede a tu cuenta para continuar tu aventura en IKUS.
                    </p>
                </div>

                {/** Formulario */}
                <div className="w-full bg-darker/40 border border-white/5 p-8 rounded-lg shadow-2xl">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                                className="w-full px-4 py-3 rounded bg-dark border border-white/10 text-primary text-base placeholder:text-muted/30 focus:outline-none focus:border-accent/50 transition-all duration-300"
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
                                className="w-full px-4 py-3 rounded bg-dark border border-white/10 text-primary text-base focus:outline-none focus:border-accent/50 transition-all duration-300"
                            />
                        </div>

                        {/** Error */}
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        {/** Botón */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full mt-2 py-3 font-bold tracking-widest border border-accent text-accent rounded-sm hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(202,178,99,0.3)] transition-all duration-300"
                        >
                            ENTRAR
                        </button>
                    </form>

                    {/** Link */}
                    <p className="text-center text-muted text-sm mt-8">
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="text-accent hover:underline tracking-wider">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>

            {/** Logo + divisor */}
            <div className="flex-1" />
            <div className="flex items-center justify-center w-full max-w-lg">
                <div className="h-px flex-1 bg-linear-to-r from-transparent to-accent/40" />
                <img src="/img/ui/Logo.png" alt="Logo IKUS" className="w-16 h-16 object-contain mx-4" />
                <div className="h-px flex-1 bg-linear-to-l from-transparent to-accent/40" />
            </div>
            <div className="flex-1" />
        </main>
    )
}
