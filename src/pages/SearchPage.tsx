import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchRepos } from "../utils/search/useSearchRepos";
import { SearchInput } from "../components/SearchInput";
import { RepoList } from "../components/RepoList";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { useDebounce } from "../utils/search/useDebounce";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 300);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedQuery, setSearchParams]);

  const { repos, loading, error, hasMore, fetchNextPage, isFetchingNextPage } =
    useSearchRepos(debouncedQuery);

  useEffect(() => {
    if (!hasMore || loading || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loading, hasMore, fetchNextPage, isFetchingNextPage]);

  const showLoading = loading || isFetchingNextPage;

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>

      <SearchInput onSearch={setQuery} initialValue={query} />

      {error && <ErrorState message={error} />}

      {repos.length === 0 && debouncedQuery && !showLoading && !error && (
        <ErrorState message="No repositories found." />
      )}

      <RepoList repos={repos} />

      {showLoading && <Loader />}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
};