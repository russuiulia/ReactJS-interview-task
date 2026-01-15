import { useInfiniteQuery } from '@tanstack/react-query';
import { searchRepos } from '../../api/github';

const PER_PAGE = 30;

export const useSearchRepos = (query: string) => {
  const { 
    data, 
    isLoading, 
    error, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['repos', query],
    queryFn: ({ pageParam = 1, signal }) => 
      searchRepos(query, pageParam, PER_PAGE, signal),
    enabled: query.trim().length > 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalLoaded = allPages.length * PER_PAGE;
      return totalLoaded < lastPage.total_count ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const repos = data?.pages.flatMap(page => page.items) ?? [];

  return {
    repos,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    hasMore: hasNextPage ?? false,
    fetchNextPage,
    isFetchingNextPage,
  };
};