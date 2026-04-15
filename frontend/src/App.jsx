import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Registro from './pages/auth/Registro'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Shop from './pages/private/Shop'
import Ranking from './pages/private/Ranking'
import Work from './pages/private/Work'
import Profile from './pages/private/Profile'

function PublicLayout({ children }) {
    return (
        <div className="bg-dark text-primary flex flex-col min-h-screen">
            <Nav />
            <div className="flex-1 flex flex-col pt-16">{children}</div>
            <Footer />
        </div>
    )
}

function PrivateLayout({ children }) {
    return (
        <div className="bg-dark text-primary flex flex-col min-h-screen">
            <Nav />
            <div className="flex flex-1 pt-16">
                <Sidebar />
                <main className="flex-1 md:ml-52 p-8">{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicLayout>
                                <Home />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicLayout>
                                <Login />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path="/registro"
                        element={
                            <PublicLayout>
                                <Registro />
                            </PublicLayout>
                        }
                    />
                    <Route
                        path="/work"
                        element={
                            <PrivateRoute>
                                <PrivateLayout>
                                    <Work />
                                </PrivateLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/shop"
                        element={
                            <PrivateRoute>
                                <PrivateLayout>
                                    <Shop />
                                </PrivateLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ranking"
                        element={
                            <PrivateRoute>
                                <PrivateLayout>
                                    <Ranking />
                                </PrivateLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <PrivateLayout>
                                    <Profile />
                                </PrivateLayout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
