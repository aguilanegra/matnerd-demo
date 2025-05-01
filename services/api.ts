import { useQuery } from '@tanstack/react-query';

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
    topics: Array<string>;
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
    return useQuery<Contributor[]>({
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
    return useQuery<Branch[]>({
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
