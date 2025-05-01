import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserProfile } from '../services/api';
// import { Github, Code, Database, BookOpen } from 'lucide-react';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const HomePage = () => {
    const { data: profile, isLoading, error } = useUserProfile();

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <section className="py-10 md:py-16">
                <div className="flex flex-col md:flex-row items-center">
                    {profile?.avatar_url && (
                        <div className="mb-8 md:mb-0 md:mr-10">
                            <img
                                src={profile.avatar_url}
                                alt={profile.name || 'GitHub Profile'}
                                className="w-48 h-48 rounded-full shadow-lg"
                            />
                        </div>
                    )}

                    <div>
                        <h1 className="text-4xl font-bold mb-4">{profile?.name || 'GitHub Explorer'}</h1>
                        <p className="text-xl text-gray-600 mb-6">{profile?.bio || 'Explore GitHub repositories and more'}</p>
                        <div className="flex flex-wrap gap-4">
                            {/*<Link*/}
                            {/*    to="/repositories"*/}
                            {/*    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"*/}
                            {/*>*/}
                            {/*    /!*<Code size={18} className="mr-2" />*!/*/}
                            {/*    View Repositories*/}
                            {/*</Link>*/}
                            <a
                                href={`https://github.com/${profile?.login || 'aguilanera'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
                            >
                                {/*<Github size={18} className="mr-2" />*/}
                                GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-black">
                    <div className="mb-4 text-blue-600">
                        {/*<Code size={32} />*/}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Browse Public Repositories</h2>
                    <p className="text-gray-600 mb-4">
                        Explore all public repositories with detailed information and statistics.
                    </p>
                    <Link
                        to="/repositories"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Browse now →
                    </Link>
                </div>

                {/*<div className="bg-white p-6 rounded-lg shadow-md text-black">*/}
                {/*    <div className="mb-4 text-blue-600">*/}
                {/*        /!*<Database size={32} />*!/*/}
                {/*    </div>*/}
                {/*    <h2 className="text-xl font-semibold mb-2">Repository Details</h2>*/}
                {/*    <p className="text-gray-600 mb-4">*/}
                {/*        View commits, contributors, branches and more for each repository.*/}
                {/*    </p>*/}
                {/*    <Link*/}
                {/*        to="/repositories"*/}
                {/*        className="text-blue-600 hover:text-blue-800 font-medium"*/}
                {/*    >*/}
                {/*        View details →*/}
                {/*    </Link>*/}
                {/*</div>*/}

                <div className="bg-white p-6 rounded-lg shadow-md text-black">
                    <div className="mb-4 text-blue-600">
                        {/*<BookOpen size={32} />*/}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-gray-600 mb-4">
                        Learn more about this project and how it was built using modern React features.
                    </p>
                    <Link
                        to="/about"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Learn more →
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

export default HomePage;
