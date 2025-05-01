import { motion } from 'framer-motion';
// import { Github, Code, ReactIcon, Layers, Database, Zap } from 'lucide-react';

const AboutPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
        >
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-3xl font-bold">About MatNerd's GitHub Explorer</h1>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Project Overview</h2>
                <p className="">
                    GitHub Explorer is a React application that provides a clean interface to browse and interact
                    with GitHub repositories. It uses the GitHub REST API to fetch repository data and display it
                    in an organized, user-friendly way.
                </p>
                <p className="">
                    This application was built as a demonstration of modern React development practices including
                    React Router for navigation, React Query for data fetching and state management, TypeScript
                    for type safety, and Framer Motion for animations.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Key Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-black">
                        <div className="text-blue-600 mb-3">
                            {/*<Database size={24} />*/}
                        </div>
                        <h3 className="text-lg font-medium mb-2">GitHub API Integration</h3>
                        <p className="text-gray-600">
                            Connects to the GitHub REST API to fetch repositories, commits, branches, and contributor information.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-black">
                        <div className="text-blue-600 mb-3">
                            {/*<Layers size={24} />*/}
                        </div>
                        <h3 className="text-lg font-medium mb-2">Component Architecture</h3>
                        <p className="text-gray-600">
                            Built with reusable, modular components following React best practices and modern patterns.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-black">
                        <div className="text-blue-600 mb-3">
                            {/*<ReactIcon size={24} />*/}
                        </div>
                        <h3 className="text-lg font-medium mb-2">React Router Navigation</h3>
                        <p className="text-gray-600">
                            Seamless navigation between pages with React Router v7, enabling a single-page application experience.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-black">
                        <div className="text-blue-600 mb-3">
                            {/*<Zap size={24} />*/}
                        </div>
                        <h3 className="text-lg font-medium mb-2">React Query State Management</h3>
                        <p className="text-gray-600">
                            Efficient data fetching, caching, and state management with React Query for optimal performance.
                        </p>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default AboutPage;
