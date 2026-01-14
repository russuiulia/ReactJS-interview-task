import { useEffect, useRef, useState } from "react";
import { useSearchRepos } from "../utils/search/useSearchRepos";
import { SearchInput } from "../components/SearchInput";
import { RepoList } from "../components/RepoList";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/Error";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setPage(1);
    setRepos([]);
    if (!query.trim()) {
      setDebouncedQuery("")
      setLoading(false);
    }
    else
      setLoading(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, hasMore } = useSearchRepos(debouncedQuery, page);

  useEffect(() => {
    if (data?.items) {
      setRepos((prev) => (page === 1 ? data.items : [...prev, ...data.items]));
      setLoading(false);
    }
  }, [data, page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
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

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>

      <SearchInput onSearch={setQuery} />

      {error && <ErrorState message={error} />}

      {repos.length === 0 && debouncedQuery && !loading && !error && (
        <ErrorState message="No repositories found." />
      )}

      <RepoList repos={repos} />

      {loading && <Loader />}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
};
