import { useReducer, useEffect } from "react";
import { getRepoDetails, getRepoContributors, getRepoLanguages } from "../../api/github";
import { repoDetailsReducer, initialRepoDetailsState } from "../reducers/repoDetailsReducer";

export const useRepoDetails = (owner: string, name: string, refreshKey = 0) => {
  const [state, dispatch] = useReducer(repoDetailsReducer, initialRepoDetailsState);

  useEffect(() => {
    let canceled = false;
    const controller = new AbortController();

    dispatch({ type: "FETCH_START" });

    Promise.all([
      getRepoDetails(owner, name, controller.signal),
      getRepoContributors(owner, name, controller.signal),
      getRepoLanguages(owner, name, controller.signal),
    ])
      .then(([repoData, contributorsData, languagesData]) => {
        if (canceled) return;

        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            repo: repoData,
            contributors: contributorsData,
            languages: languagesData,
          },
        });
      })
      .catch((err) => {
        if (canceled) return;
        if (err.name === "AbortError") return;

        dispatch({
          type: "FETCH_ERROR",
          payload: err.message,
        });
      });

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [owner, name, refreshKey]);

  return {
    repo: state.repo,
    contributors: state.contributors,
    languages: state.languages,
    loading: state.loading,
    error: state.error,
  };
};