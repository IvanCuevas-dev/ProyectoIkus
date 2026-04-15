import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

let slides = [
    {
        className: 'hero-1',
        content: (
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-16 animate-fade-in">
                <img
                    src="/img/ui/ProyectoIkus.png"
                    alt="Proyecto Ikus logo"
                    className="w-full max-w-87.5 md:max-w-137.5 lg:max-w-175 drop-shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-fade-in"
                />
                <p className="mt-2 text-xl md:text-2xl text-accent tracking-widest md:tracking-[0.3em] font-display uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:0_0_20px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,1)] w-full max-w-lg mx-auto animate-fade-in">
                    Juego de rol y estrategia Online
                </p>
            </div>
        ),
    },
    {
        className: 'hero-2',
        content: (
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-16">
                <p className="mt-2 text-2xl lg:text-3xl text-accent tracking-[0.3em] font-display uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:0_0_20px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,1)]">
                    Equipa y sigue la progresión de tu personaje
                </p>
            </div>
        ),
    },
    {
        className: 'hero-3',
        content: (
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-16">
                <p className="mt-2 text-2xl lg:text-3xl text-accent tracking-[0.3em] font-display uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)] [text-shadow:0_0_20px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,1)]">
                    Adéntrate en un mundo hostil
                </p>
            </div>
        ),
    },
]

let cards = [
    {
        img: '/img/cards/Card_1.png',
        alt: 'Interacción',
        title: 'INTERACCIÓN',
        text: 'Forja alianzas, traiciona pactos y decide con otros jugadores el destino del mundo.',
    },
    {
        img: '/img/cards/Card_2.png',
        alt: 'Gestión de personaje',
        title: 'GESTIÓN DE PERSONAJE',
        text: 'Entrena, equipa y personaliza a tu personaje para sobrevivir en un mundo hostil.',
    },
    {
        img: '/img/cards/Card_3.png',
        alt: 'Mundo persistente',
        title: 'MUNDO PERSISTENTE',
        text: 'Tus decisiones influyen en un reino vivo que evoluciona con cada acción realizada.',
    },
]

export default function Home() {
    let [currentSlide, setCurrentSlide] = useState(0)

    let goTo = (index) => setCurrentSlide(index)
    let prev = () => setCurrentSlide((c) => (c - 1 + slides.length) % slides.length)
    let next = () => setCurrentSlide((c) => (c + 1) % slides.length)

    // Avance del hero
    useEffect(() => {
        let timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <main className="flex-1 bg-dark">
            {/* HERO */}
            <section className="relative w-full overflow-hidden h-[calc(100dvh-4rem)] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]">
                <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
                >
                    {slides.map((slide, i) => (
                        <div key={i} className={`hero-slide ${slide.className} w-screen h-full relative shrink-0`}>
                            <div className="hero-overlay" />
                            {slide.content}
                        </div>
                    ))}
                </div>

                {/* Puntos */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`cursor-pointer w-2 h-2 rounded-full border border-white/20 transition-all ${i === currentSlide ? 'bg-white scale-110' : 'bg-white/40'}`}
                        />
                    ))}
                </div>

                {/* Flechas */}
                <button
                    onClick={prev}
                    className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all"
                >
                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={next}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </section>

            {/* INFO */}
            <div className="relative overflow-hidden pt-16 pb-24">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-200 h-125 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Intro */}
                <section className="relative z-10 max-w-3xl mx-auto text-center px-4 mb-16">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-accent tracking-[0.2em] mb-6 uppercase">
                        Un mundo nuevo te espera
                    </h2>
                    <p className="text-muted text-xl leading-relaxed italic">
                        IKUS es un juego online que combina mecánicas de rol y estrategia con un sistema de progresión
                        basado en el tiempo.
                    </p>
                </section>

                {/* Botón crear PJ + divisor */}
                <section className="relative z-10 text-center px-4 mb-12">
                    <Link
                        to="/registro"
                        className="inline-block px-10 py-4 font-bold tracking-[0.2em] border border-accent text-accent rounded-sm hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(202,178,99,0.3)] transition-all duration-300 active:scale-95"
                    >
                        CREA TU PERSONAJE
                    </Link>

                    <div className="relative z-10 flex items-center justify-center gap-6 my-20 px-4">
                        <div className="h-px flex-1 max-w-62.5 bg-linear-to-r from-transparent to-accent" />
                        <img src="/img/ui/Logo.png" alt="Logo IKUS" className="w-20 h-20 object-contain" />
                        <div className="h-px flex-1 max-w-62.5 bg-linear-to-l from-transparent to-accent" />
                    </div>
                </section>

                {/* Cards */}
                <section className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="group relative bg-darker/30 border border-white/5 rounded-lg overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]"
                            >
                                <div className="overflow-hidden h-56">
                                    <img
                                        src={card.img}
                                        alt={card.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                    />
                                </div>
                                <div className="p-6 relative">
                                    <h3 className="font-display font-bold text-accent mb-3 group-hover:text-primary transition-colors text-center">
                                        {card.title}
                                    </h3>
                                    <p className="text-muted text-base leading-relaxed italic text-center">
                                        {card.text}
                                    </p>
                                    <div className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
