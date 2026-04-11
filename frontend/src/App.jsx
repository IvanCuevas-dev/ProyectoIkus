import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Registro from './pages/auth/Registro'

function Layout({ children }) {
    return (
        <div className="bg-dark text-primary flex flex-col min-h-screen">
            <Nav />
            <div className="flex-1 flex flex-col pt-16">{children}</div>
            <Footer />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}
