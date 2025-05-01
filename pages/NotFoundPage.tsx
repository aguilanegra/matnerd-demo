import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { AlertCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            <div className="text-red-500 mb-6">
                {/*<AlertCircle size={64} />*/}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>

            <p className="text-gray-600 mb-8 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {/*<Home size={18} className="mr-2" />*/}
                Back to Home
            </Link>
        </motion.div>
    );
};

export default NotFoundPage;
