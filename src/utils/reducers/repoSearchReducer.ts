import type { Reducer } from "react";
import type { SearchResponse } from "../../types/github";

export interface RepoSearchState {
  data: SearchResponse | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

export type RepoSearchAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { data: SearchResponse; hasMore: boolean } }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "RESET" };

export const initialRepoSearchState: RepoSearchState = {
  data: null,
  loading: false,
  error: null,
  hasMore: false,
};

export const repoSearchReducer: Reducer<RepoSearchState, RepoSearchAction> = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload.data,
        hasMore: action.payload.hasMore,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "RESET":
      return initialRepoSearchState;
    default:
      return state;
  }
};