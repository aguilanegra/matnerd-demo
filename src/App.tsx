import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import './App.css';
import Loading from '../components/common/Loading';

// Lazy load the main app content for better performance
const AppContent = lazy(() => import('../components/AppContent'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Suspense fallback={<Loading />}>
                    <AppContent />
                </Suspense>
            </Router>
        </QueryClientProvider>
    );
}
