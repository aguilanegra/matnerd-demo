import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { Star, GitFork, Eye, Calendar, Search, Code } from 'lucide-react';
import { useRepositories } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const RepositoriesPage = () => {
    const { data: repositories, isLoading, error } = useRepositories();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('updated');

    // Extract all unique languages from repositories
    const languages = useMemo(() => {
        if (!repositories) return [];
        const langSet = new Set<string>();
        repositories.forEach(repo => {
            if (repo.language) langSet.add(repo.language);
        });
        return Array.from(langSet).sort();
    }, [repositories]);

    // Filter and sort repositories
    const filteredRepositories = useMemo(() => {
        if (!repositories) return [];

        return repositories
            .filter(repo => {
                const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
                const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
                return matchesSearch && matchesLanguage;
            })
            .sort((a, b) => {
                if (sortBy === 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else if (sortBy === 'updated') {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                } else {
                    // Sort by name
                    return a.name.localeCompare(b.name);
                }
            });
    }, [repositories, searchTerm, selectedLanguage, sortBy]);

    // Format date to readable string
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-3xl font-bold">Repositories</h1>
                <p className="text-gray-600 mt-2">
                    Browse through all public repositories for aguilanegra
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm text-black">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {/*<Search size={18} className="text-gray-400" />*/}
                        </div>
                        <input
                            type="text"
                            placeholder="Search repositories..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={selectedLanguage || ''}
                            onChange={(e) => setSelectedLanguage(e.target.value || null)}
                        >
                            <option value="">All Languages</option>
                            {languages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated' | 'name')}
                        >
                            <option value="updated">Recently Updated</option>
                            <option value="stars">Most Stars</option>
                            <option value="name">Name (A-Z)</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredRepositories.length === 0 ? (
                <div className="bg-white p-6 text-center rounded-lg shadow-sm">
                    {/*<Code size={40} className="mx-auto text-gray-400 mb-2" />*/}
                    <h3 className="text-lg font-medium text-gray-900">No repositories found</h3>
                    <p className="mt-1 text-gray-500">Try changing your search criteria or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredRepositories.map(repo => (
                        <motion.div
                            key={repo.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="sm:flex sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                                        <Link to={`/repositories/${repo.name}`}>{repo.name}</Link>
                                    </h2>

                                    {repo.description && (
                                        <p className="mt-2 text-gray-600">{repo.description}</p>
                                    )}

                                    <div className="mt-4 flex flex-wrap gap-4">
                                        {repo.language && (
                                            <span className="inline-flex items-center text-sm text-gray-600">
                        <span className={`w-3 h-3 rounded-full mr-1 bg-blue-500`}></span>
                                                {repo.language}
                      </span>
                                        )}

                                        <span className="inline-flex items-center text-sm text-gray-600">
                      {/*<Star size={16} className="mr-1" />*/}
                                            {repo.stargazers_count}
                    </span>

                                        <span className="inline-flex items-center text-sm text-gray-600">
                      {/*<GitFork size={16} className="mr-1" />*/}
                                            {repo.forks_count}
                    </span>

                                        {repo.watchers_count > 0 && (
                                            <span className="inline-flex items-center text-sm text-gray-600">
                        {/*<Eye size={16} className="mr-1" />*/}
                                                {repo.watchers_count}
                      </span>
                                        )}

                                        <span className="inline-flex items-center text-sm text-gray-600">
                      {/*<Calendar size={16} className="mr-1" />*/}
                      Updated {formatDate(repo.updated_at)}
                    </span>
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-0 sm:ml-4">
                                    <Link
                                        to={`/repositories/${repo.name}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default RepositoriesPage;
