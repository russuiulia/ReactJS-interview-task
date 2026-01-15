import { useQueries } from '@tanstack/react-query';
import { getRepoDetails, getRepoContributors, getRepoLanguages } from '../../api/github';

export const useRepoDetails = (owner: string, name: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['repo', owner, name],
        queryFn: ({ signal }) => getRepoDetails(owner, name, signal),
        enabled: !!owner && !!name,
      },
      {
        queryKey: ['contributors', owner, name],
        queryFn: ({ signal }) => getRepoContributors(owner, name, signal),
        enabled: !!owner && !!name,
      },
      {
        queryKey: ['languages', owner, name],
        queryFn: ({ signal }) => getRepoLanguages(owner, name, signal),
        enabled: !!owner && !!name,
      },
    ],
  });

  const [repoQuery, contributorsQuery, languagesQuery] = queries;

  const isLoading = queries.some(q => q.isLoading);
  const error = queries.find(q => q.isError)?.error as Error | undefined;

  return {
    repo: repoQuery.data ?? null,
    contributors: contributorsQuery.data ?? [],
    languages: languagesQuery.data ?? {},
    loading: isLoading,
    error: error?.message ?? null,
  };
};
