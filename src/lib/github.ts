import type { ProjectItem } from './config';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
}

export async function fetchGitHubRepos(
  username: string,
  maxRepos = 6
): Promise<ProjectItem[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=${Math.min(maxRepos, 30)}&type=owner`,
      {
        cache: 'force-cache',
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, maxRepos)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));
  } catch {
    return [];
  }
}
