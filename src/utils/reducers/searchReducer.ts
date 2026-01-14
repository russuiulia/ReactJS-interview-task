import type { Reducer } from "react";
import type { Repository } from "../../types/github";

export interface SearchState {
  query: string;
  debouncedQuery: string;
  page: number;
  repos: Repository[];
  loading: boolean;
}

export type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_DEBOUNCED_QUERY"; payload: string }
  | { type: "RESET_SEARCH" }
  | { type: "SET_REPOS"; payload: Repository[] }
  | { type: "APPEND_REPOS"; payload: Repository[] }
  | { type: "INCREMENT_PAGE" }
  | { type: "SET_LOADING"; payload: boolean };

export const initialSearchState: SearchState = {
  query: "",
  debouncedQuery: "",
  page: 1,
  repos: [],
  loading: false,
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
        loading: false,
      };
    case "RESET_SEARCH":
      return {
        ...state,
        page: 1,
        repos: [],
        debouncedQuery: "",
        loading: false,
      };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case "APPEND_REPOS":
      return {
        ...state,
        repos: [...state.repos, ...action.payload],
        loading: false,
      };
    case "INCREMENT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};