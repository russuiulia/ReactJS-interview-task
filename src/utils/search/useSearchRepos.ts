import { useEffect, useReducer, useRef } from "react";
import { searchRepos } from '../../api/github';
import { repoSearchReducer, initialRepoSearchState } from "../reducers/repoSearchReducer";

const PER_PAGE = 30;

export const useSearchRepos = (query: string, page: number) => {
  const [state, dispatch] = useReducer(repoSearchReducer, initialRepoSearchState);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!query.trim()) {
      dispatch({ type: "RESET" });
      return;
    }

    const currentId = ++requestIdRef.current;
    let canceled = false;

    dispatch({ type: "FETCH_START" });

    const controller = new AbortController();

    searchRepos(query, page, PER_PAGE, controller.signal)
      .then((json) => {
        if (canceled) return;
        if (currentId !== requestIdRef.current) return;

        const alreadyLoaded = page * PER_PAGE;
        const hasMore = alreadyLoaded < json.total_count;

        dispatch({
          type: "FETCH_SUCCESS",
          payload: { data: json, hasMore }
        });
      })
      .catch((err) => {
        if (canceled) return;
        if (err.name === "AbortError") return;

        dispatch({
          type: "FETCH_ERROR",
          payload: err.message || "Unexpected error"
        });
      });

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [query, page]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore
  };
};