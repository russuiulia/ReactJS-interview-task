import type { Reducer } from "react";
import type { Repository } from "../../types/github";

export interface SearchState {
  query: string;
  debouncedQuery: string;
  page: number;
  repos: Repository[];
}

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_DEBOUNCED_QUERY"; payload: string }
  | { type: "RESET_SEARCH" }
  | { type: "RESET_PAGINATION" }
  | { type: "SET_REPOS"; payload: Repository[] }
  | { type: "APPEND_REPOS"; payload: Repository[] }
  | { type: "INCREMENT_PAGE" };

export const initialSearchState: SearchState = {
  query: "",
  debouncedQuery: "",
  page: 1,
  repos: [],
};

export const searchReducer: Reducer<SearchState, SearchAction> = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "SET_DEBOUNCED_QUERY":
      return {
        ...state,
        debouncedQuery: action.payload,
      };
    case "RESET_SEARCH":
      return {
        ...state,
        page: 1,
        repos: [],
        debouncedQuery: "",
      };
    case "RESET_PAGINATION":
      return {
        ...state,
        page: 1,
        repos: [],
      };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.payload,
      };
    case "APPEND_REPOS":
      return {
        ...state,
        repos: [...state.repos, ...action.payload],
      };
    case "INCREMENT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};