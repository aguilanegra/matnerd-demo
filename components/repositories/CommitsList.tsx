import { useState } from 'react';
import { GitCommit, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

// Mock interface for CommitInfo
interface CommitInfo {
    sha: string;
    html_url: string;
    commit: {
        message: string;
        author: {
            name: string;
            email: string;
            date: string;
        };
    };
    author: {
        login: string;
        avatar_url: string;
        html_url: string;
    } | null;
}

interface CommitsListProps {
    commits: CommitInfo[];
    repoName: string;
}

const CommitsList = ({ commits = [], repoName }) => {
    const [expandedCommit, setExpandedCommit] = useState(null);

    const toggleCommit = (sha) => {
        setExpandedCommit(expandedCommit === sha ? null : sha);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
            {Array.isArray(commits) && commits.map((commit) => (
                <div key={commit.sha} className="py-4 px-4">
                    <div
                        className="flex items-start justify-between cursor-pointer"
                        onClick={() => toggleCommit(commit.sha)}
                    >
                        <div className="flex items-start">
                            <div className="mr-3 mt-1">
                                <GitCommit size={18} className="text-gray-500" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 break-words pr-4">
                                    {commit.commit.message.split('\n')[0]}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="mr-3">
                    {commit.author?.login || commit.commit.author.name}
                  </span>
                                    <span>
                    {formatDate(commit.commit.author.date)}
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <a
                                href={commit.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 mr-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={16} />
                            </a>
                            {expandedCommit === commit.sha ? (
                                <ChevronUp size={18} className="text-gray-500" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-500" />
                            )}
                        </div>
                    </div>

                    {expandedCommit === commit.sha && (
                        <div className="mt-4 pl-8">
                            <div className="p-4 bg-gray-50 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {commit.commit.message}
                </pre>

                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <div className="flex items-center">
                                        {commit.author?.avatar_url && (
                                            <img
                                                src={commit.author.avatar_url}
                                                alt={`${commit.author.login}'s avatar`}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium">
                                                {commit.author?.login || commit.commit.author.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {commit.commit.author.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 text-xs">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {commit.sha.substring(0, 7)}
                  </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {commits.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                    No commits found for {repoName}
                </div>
            )}
        </div>
    );
};

export default CommitsList;
