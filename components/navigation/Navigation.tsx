import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
    to: string;
    label: string;
}

function Navigation() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks: NavLink[] = [
        { to: '/', label: 'Home' },
        // { to: '/repositories', label: 'Repositories' },
        { to: '/about', label: 'About' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/*<Github size={24} />*/}
                    <Link to="/" className="text-xl font-bold">
                        MatNerd's GitHub Explorer
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`hover:text-blue-300 transition-colors ${
                                location.pathname === link.to ||
                                (link.to !== '/' && location.pathname.startsWith(link.to))
                                    ? 'text-blue-400 font-medium'
                                    : ''
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                    {/*{isMenuOpen ? <X size={24} /> : <Menu size={24} />}*/}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md animate-fadeIn">
                    <div className="flex flex-col p-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`py-2 hover:text-blue-300 transition-colors ${
                                    location.pathname === link.to ||
                                    (link.to !== '/' && location.pathname.startsWith(link.to))
                                        ? 'text-blue-400 font-medium'
                                        : ''
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
