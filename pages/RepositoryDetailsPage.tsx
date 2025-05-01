import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import {
//     Star,
//     GitFork,
//     Eye,
//     Clock,
//     Users,
//     GitBranch,
//     Calendar,
//     ExternalLink,
//     Code,
//     ArrowLeft,
//     BookOpen,
//     Shield,
//     FileCode
// } from 'lucide-react';
import {
    useRepository,
    useRepositoryContributors,
    useRepositoryBranches,
    useStarRepository,
    useUnstarRepository
} from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
// import TokenModal from '../components/repositories/TokenModal';

const RepositoryDetailsPage = () => {
    const { repoName } = useParams<{ repoName: string }>();
    const navigate = useNavigate();
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'branches'>('overview');

    const {
        data: repository,
        isLoading: isRepoLoading,
        error: repoError
    } = useRepository(repoName || '');

    const {
        data: contributors,
        isLoading: isContributorsLoading
    } = useRepositoryContributors(repoName || '');

    const {
        data: branches,
        isLoading: isBranchesLoading
    } = useRepositoryBranches(repoName || '');

    const {
        starRepository,
        isStarring,
        hasToken: hasStarToken,
        setToken: setStarToken
    } = useStarRepository();

    const {
        unstarRepository,
        isUnstarring,
        hasToken: hasUnstarToken,
        setToken: setUnstarToken
    } = useUnstarRepository();

    const isLoading = isRepoLoading ||
        (activeTab === 'overview' && isContributorsLoading) ||
        (activeTab === 'branches' && isBranchesLoading)

    if (isLoading && !repository) return <Loading />;
    if (repoError) return <ErrorMessage message={repoError.message} />;
    if (!repository) return <ErrorMessage message="Repository not found" />;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleStar = () => {
        if (!hasStarToken) {
            setShowTokenModal(true);
            return;
        }
        starRepository({ repoName: repository.name });
    };

    const handleUnstar = () => {
        if (!hasUnstarToken) {
            setShowTokenModal(true);
            return;
        }
        unstarRepository({ repoName: repository.name });
    };

    const handleTokenSubmit = (token: string) => {
        setStarToken(token);
        setUnstarToken(token);
        localStorage.setItem('github_token', token);
        setShowTokenModal(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => navigate('/repositories')}
                    className="inline-flex items-center hover:text-gray-900"
                >
                    {/*<ArrowLeft size={16} className="mr-1" />*/}
                    Back to repositories
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{repository.name}</h1>
                        {repository.description && (
                            <p className="mt-2 text-gray-600">{repository.description}</p>
                        )}
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                        <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md hover:bg-gray-50 text-black"
                        >
                            {/*<ExternalLink size={16} className="mr-2" />*/}
                            View on GitHub
                        </a>

                        <button
                            onClick={handleStar}
                            disabled={isStarring || isUnstarring}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            {/*<Star size={16} className="mr-2" />*/}
                            Star
                        </button>
                    </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center text-gray-600">
                            {/*<Star size={16} className="mr-1" />*/}
                            <span>{repository.stargazers_count} stars</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            {/*<GitFork size={16} className="mr-1" />*/}
                            <span>{repository.forks_count} forks</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                            {/*<Eye size={16} className="mr-1" />*/}
                            <span>{repository.watchers_count} watchers</span>
                        </div>

                        {repository.language && (
                            <div className="flex items-center text-gray-600">
                                {/*<Code size={16} className="mr-1" />*/}
                                <span>{repository.language}</span>
                            </div>
                        )}

                        <div className="flex items-center text-gray-600">
                            {/*<Calendar size={16} className="mr-1" />*/}
                            <span>Updated on {formatDate(repository.updated_at)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-4 text-sm font-medium ${
                                activeTab === 'overview'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center">
                                {/*<BookOpen size={16} className="mr-2" />*/}
                                Overview
                            </div>
                        </button>

                        {/*<button*/}
                        {/*    onClick={() => setActiveTab('commits')}*/}
                        {/*    className={`px-4 py-4 text-sm font-medium ${*/}
                        {/*        activeTab === 'commits'*/}
                        {/*            ? 'text-blue-600 border-b-2 border-blue-600'*/}
                        {/*            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'*/}
                        {/*    }`}*/}
                        {/*>*/}
                        {/*    <div className="flex items-center">*/}
                        {/*        /!*<Clock size={16} className="mr-2" />*!/*/}
                        {/*        Commits*/}
                        {/*    </div>*/}
                        {/*</button>*/}

                        <button
                            onClick={() => setActiveTab('branches')}
                            className={`px-4 py-4 text-sm font-medium ${
                                activeTab === 'branches'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center">
                                {/*<GitBranch size={16} className="mr-2" />*/}
                                Branches
                            </div>
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">About</h2>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-gray-900">{formatDate(repository.created_at)}</dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-gray-900">{formatDate(repository.updated_at)}</dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Default Branch</dt>
                                        <dd className="mt-1 text-gray-900">{repository.default_branch}</dd>
                                    </div>

                                    {repository.license && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">License</dt>
                                            <dd className="mt-1 text-gray-900">{repository.license.name}</dd>
                                        </div>
                                    )}

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Open Issues</dt>
                                        <dd className="mt-1 text-gray-900">{repository.open_issues_count}</dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Visibility</dt>
                                        <dd className="mt-1 text-gray-900 capitalize">{repository.visibility}</dd>
                                    </div>
                                </dl>
                            </div>

                            {repository.topics && repository.topics.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Topics</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {repository.topics.map(topic => (
                                            <span
                                                key={topic}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
                                            >
                        {topic}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {contributors && contributors.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        {/*<Users size={18} className="mr-2" />*/}
                                        Contributors
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {contributors.map(contributor => (
                                            <a
                                                key={contributor.id}
                                                href={contributor.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
                                            >
                                                <img
                                                    src={contributor.avatar_url}
                                                    alt={contributor.login}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{contributor.login}</p>
                                                    <p className="text-xs text-gray-500">{contributor.contributions} commits</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'branches' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                {/*<GitBranch size={20} className="mr-2" />*/}
                                Branches
                            </h2>

                            {isBranchesLoading ? (
                                <Loading message="Loading branches..." />
                            ) : branches && branches.length > 0 ? (
                                <div className="border rounded-md divide-y">
                                    {branches.map((branch) => (
                                        <div
                                            key={branch.name}
                                            className="p-4 flex items-center justify-between hover:bg-gray-50"
                                        >
                                            <div className="flex items-center">
                                                {/*<GitBranch size={16} className="mr-2 text-gray-500" />*/}
                                                <span className="font-medium">{branch.name}</span>
                                                {branch.name === repository.default_branch && (
                                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                                                )}
                                            </div>
                                            <a
                                                href={`${repository.html_url}/tree/${branch.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                View
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No branches found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/*<TokenModal*/}
            {/*    isOpen={showTokenModal}*/}
            {/*    onClose={() => setShowTokenModal(false)}*/}
            {/*    onSubmit={handleTokenSubmit}*/}
            {/*/>*/}
        </motion.div>
    );
};

export default RepositoryDetailsPage;
