import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './navigation/Navigation';
import Footer from './navigation/Footer';
import HomePage from '../pages/HomePage';
import RepositoriesPage from '../pages/RepositoriesPage';
import RepositoryDetailsPage from '../pages/RepositoryDetailsPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

function AppContent() {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen min-w-1/2">
            <Navigation />
            <main className="flex-grow pt-16 pb-10 container mx-auto px-4">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/repositories" element={<RepositoriesPage />} />
                        <Route path="/repositories/:repoName" element={<RepositoryDetailsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}

export default AppContent;
