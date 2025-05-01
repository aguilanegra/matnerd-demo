import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const GITHUB_API_URL = 'https://api.github.com';
const USERNAME = 'aguilanegra';

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    license: {
        key: string;
        name: string;
        url: string;
    } | null;
    default_branch: string;
    visibility: string;
}

export interface Contributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

export interface Branch {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
}

export interface CommitInfo {
    sha: string;
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
    } | null;
    html_url: string;
}

export const useRepositories = () => {
    return useQuery({
        queryKey: ['repositories', USERNAME],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/users/${USERNAME}/repos?per_page=100&sort=updated`);
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            return response.json();
        }
    });
};

export const useRepository = (repoName: string) => {
    return useQuery({
        queryKey: ['repository', USERNAME, repoName],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/repos/${USERNAME}/${repoName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch repository details');
            }
            return response.json();
        },
        enabled: !!repoName
    });
};

export const useRepositoryContributors = (repoName: string) => {
    return useQuery({
        queryKey: ['contributors', USERNAME, repoName],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/repos/${USERNAME}/${repoName}/contributors?per_page=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch contributors');
            }
            return response.json();
        },
        enabled: !!repoName
    });
};

export const useRepositoryBranches = (repoName: string) => {
    return useQuery({
        queryKey: ['branches', USERNAME, repoName],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/repos/${USERNAME}/${repoName}/branches`);
            if (!response.ok) {
                throw new Error('Failed to fetch branches');
            }
            return response.json();
        },
        enabled: !!repoName
    });
};

export const useRepositoryCommits = (repoName: string) => {
    return useQuery({
        queryKey: ['commits', USERNAME, repoName],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/repos/${USERNAME}/${repoName}/commits?per_page=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch commits');
            }
            return response.json();
        },
        enabled: !!repoName
    });
};

export const useStarRepository = () => {
    const queryClient = useQueryClient();
    const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));

    const mutation = useMutation({
        mutationFn: async ({ repoName }: { repoName: string }) => {
            if (!token) {
                throw new Error('GitHub token not available');
            }

            const response = await fetch(`${GITHUB_API_URL}/user/starred/${USERNAME}/${repoName}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to star repository');
            }
        },
        onSuccess: (_, { repoName }) => {
            queryClient.invalidateQueries({ queryKey: ['repository', USERNAME, repoName] });
        }
    });

    return {
        starRepository: mutation.mutate,
        isStarring: mutation.isPending,
        error: mutation.error,
        setToken,
        hasToken: !!token,
    };
};

export const useUnstarRepository = () => {
    const queryClient = useQueryClient();
    const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));

    const mutation = useMutation({
        mutationFn: async ({ repoName }: { repoName: string }) => {
            if (!token) {
                throw new Error('GitHub token not available');
            }

            const response = await fetch(`${GITHUB_API_URL}/user/starred/${USERNAME}/${repoName}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to unstar repository');
            }
        },
        onSuccess: (_, { repoName }) => {
            queryClient.invalidateQueries({ queryKey: ['repository', USERNAME, repoName] });
        }
    });

    return {
        unstarRepository: mutation.mutate,
        isUnstarring: mutation.isPending,
        error: mutation.error,
        setToken,
        hasToken: !!token,
    };
};

// export const useUserProfile = () => {
//     return useQuery({
//         queryKey: ['user', USERNAME],
//         queryFn: async () => {
//             const response = await fetch(`${GITHUB_API_URL}/users/${USERNAME}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user profile');
//             }
//             return response.json();
//         }
//     });
// };

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user', USERNAME],
        queryFn: async () => {
            const response = await fetch(`${GITHUB_API_URL}/users/${USERNAME}`, {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
            }

            return response.json();
        },
        staleTime: 1000 * 60 * 5,
    });
};
