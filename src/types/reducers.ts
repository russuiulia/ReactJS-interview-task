import type { Repository } from './github';

export interface SearchState {
  debouncedQuery: string;
  query: string;
  page: number;
  repos: Repository[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'NEXT_PAGE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_REPOS'; payload: Repository[] }
  | { type: 'ADD_REPOS'; payload: Repository[] }
  | { type: 'RESET' };