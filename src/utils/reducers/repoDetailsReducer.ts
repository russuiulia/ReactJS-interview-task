import type { Reducer } from "react";
import type { Contributor, Languages, Repository } from '../../types/github';

export interface RepoDetailsState {
  repo: Repository | null;
  contributors: Contributor[];
  languages: Languages;
  loading: boolean;
  error: string | null;
}

export type RepoDetailsAction =
  | { type: "FETCH_START" }
  | { 
      type: "FETCH_SUCCESS"; 
      payload: { 
        repo: Repository; 
        contributors: Contributor[]; 
        languages: Languages 
      } 
    }
  | { type: "FETCH_ERROR"; payload: string };

export const initialRepoDetailsState: RepoDetailsState = {
  repo: null,
  contributors: [],
  languages: {},
  loading: true,
  error: null,
};

export const repoDetailsReducer: Reducer<RepoDetailsState, RepoDetailsAction> = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        repo: action.payload.repo,
        contributors: action.payload.contributors,
        languages: action.payload.languages,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};