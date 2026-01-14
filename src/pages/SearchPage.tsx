import { useEffect, useReducer, useRef } from "react";
import { useSearchRepos } from "../utils/search/useSearchRepos";
import { SearchInput } from "../components/SearchInput";
import { RepoList } from "../components/RepoList";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";
import { searchReducer, initialSearchState } from "../utils/reducers/searchReducer";

export const SearchPage = () => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!state.query.trim()) {
      dispatch({ type: "RESET_SEARCH" });
      return;
    }

    dispatch({ type: "RESET_PAGINATION" });

    const timer = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_QUERY", payload: state.query });
    }, 300);

    return () => clearTimeout(timer);
  }, [state.query]);

  const { data, error, hasMore, loading } = useSearchRepos(state.debouncedQuery, state.page);

  useEffect(() => {
    if (!data?.items) return;

    const action = state.page === 1
      ? { type: "SET_REPOS" as const, payload: data.items }
      : { type: "APPEND_REPOS" as const, payload: data.items };

    dispatch(action);
  }, [data, state.page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch({ type: "INCREMENT_PAGE" });
        }
      },
      { rootMargin: "200px" }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loading, hasMore]);

  const handleSearch = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
  };

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>

      <SearchInput onSearch={handleSearch} />

      {error && <ErrorState message={error} />}

      {state.repos.length === 0 && state.debouncedQuery && !loading && !error && (
        <ErrorState message="No repositories found." />
      )}

      <RepoList repos={state.repos} />

      {loading && <Loader />}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
};