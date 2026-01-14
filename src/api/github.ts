import { PER_PAGE } from '../utils/const';
import type { SearchResponse, Repository, Contributor, Languages } from '../types/github';

const BASE_URL = "https://api.github.com";

export const searchRepos = async (
  query: string,
  page = 1,
  per_page = PER_PAGE,
  signal?: AbortSignal
): Promise<SearchResponse> => {
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`,
    {
      signal
    }
  );

  if (!res.ok) {
    if (res.status === 403) {
      const resetTime = res.headers.get('X-RateLimit-Reset');
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString() : 'unknown';
      throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate}`);
    }
    throw new Error("Failed to fetch repositories");
  }

  return res.json();
};

export const getRepoDetails = async (owner: string, repo: string, signal?: AbortSignal): Promise<Repository> => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
    signal
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('GitHub API rate limit exceeded');
    }
    throw new Error("Failed to fetch repository details");
  }

  return res.json();
};

export const getRepoContributors = async (owner: string, repo: string, signal?: AbortSignal): Promise<Contributor[]> => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors`, {
    signal
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('GitHub API rate limit exceeded');
    }
    throw new Error("Failed to fetch contributors");
  }

  return res.json();
};

export const getRepoLanguages = async (owner: string, repo: string, signal?: AbortSignal): Promise<Languages> => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`, {
    signal
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('GitHub API rate limit exceeded');
    }
    throw new Error("Failed to fetch languages");
  }

  return res.json();
};