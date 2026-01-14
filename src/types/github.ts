export interface Repository {
  id: number;
  full_name: string;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
}

export interface Languages {
  [language: string]: number;
}