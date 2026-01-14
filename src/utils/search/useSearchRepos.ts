import { useEffect, useRef, useState } from "react";
import { searchRepos } from '../../api/github';

const PER_PAGE = 30;

export const useSearchRepos = (query: string, page: number) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      setHasMore(false);
      setLoading(false);
      return;
    }

    const currentId = ++requestIdRef.current;
    let canceled = false;

    setLoading(true);
    setError(null);

    const controller = new AbortController();

    searchRepos(query, page, PER_PAGE, controller.signal)
      .then((json) => {
        if (canceled) return;
        if (currentId !== requestIdRef.current) return;

        setData(json);
        const alreadyLoaded = page * PER_PAGE;
        setHasMore(alreadyLoaded < json.total_count);
      })
      .catch((err) => {
        if (canceled) return;
        if (err.name === "AbortError") return;

        setError(err.message || "Unexpected error");
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [query, page]);

  return { data, loading, error, hasMore };
};
