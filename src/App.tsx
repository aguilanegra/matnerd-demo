import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
} from 'react-router-dom'
import './App.css'

function Home() {
    return (
        <h2 className="text-2xl">Home Page</h2>
    )
}

function About() {
    return (
        <h2 className="text-2xl">About Page</h2>
    )
}

function Work() {
    return <h2 className="text-2xl">Work Page</h2>
}

function Navigation() {
    const location = useLocation()
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/work', label: 'Work' },
    ]

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 text-left z-10">
            {navLinks.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 hover:text-gray-200 ${
                        location.pathname === link.to ? 'font-bold' : ''
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

function AppContent() {
     return (
         <div>
             <Navigation/>
             <main className="flex-grow p-4">
                 <Routes>
                     <Route path="/" element={<Home/>}/>
                     <Route path="/about" element={<About/>}/>
                     <Route path="/work" element={<Work/>}/>
                 </Routes>
             </main>
         </div>
     )
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}
