const BASE_URL = "https://api.github.com";

export const searchRepos = async (
  query: string,
  page = 1,
  per_page = 30,
  signal?: AbortSignal
) => {
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`,
    {
      signal
    }
  );

  if (!res.ok) throw new Error("Failed to fetch repositories");

  return res.json();
};

export const getRepoDetails = async (owner: string, repo: string) => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error("Failed to fetch repository details");
  return res.json();
};

export const getRepoContributors = async (owner: string, repo: string) => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors`);
  if (!res.ok) throw new Error("Failed to fetch contributors");
  return res.json();
};

export const getRepoLanguages = async (owner: string, repo: string) => {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`);
  if (!res.ok) throw new Error("Failed to fetch languages");
  return res.json();
};
