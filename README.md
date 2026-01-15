# GitHub Repository Explorer
### Interview task
---

## Development Process
### Initial Approach
I started by building everything from scratch:

API Layer:

- Used `fetch` to write GitHub API functions
- Added `AbortController` for request cleanup

#### Custom Hooks:

- Built `useSearchRepos` and `useRepoDetails` with `useReducer`
- Implemented race condition prevention with request ID tracking
- Added manual abort handling and error states

#### UI Features:

- Infinite scroll using `IntersectionObserver`
- Input debouncing (500ms)

## Improvements
After getting the basics working, I improved the app:

#### Switched to React Query:

- Handles caching, deduplication, and background refetching automatically
- Industry standard for data fetching
- Removed a lot of manual state management code
- Auto-refresh works out of the box
- Caching - data loads instantly when navigating back

#### Better UX:

- Memoization - Used `useMemo` for language chart calculations to avoid re-renders
- Made search query a URL parameter `(?q=react)` so searches are shareable/bookmarkable
- Added error boundary for catching React errors
- Better loading states and error messages
- Back button on repo details page

#### Testing:

- Wrote unit tests for hooks
- Tested race conditions, abort handling, and error states
- Used Vitest with proper API mocking

### Commit History
The commit history shows my thought process from initializing the app to tweaking it as more ideas came to mind. You can see:

- Initial setup and API integration
- Custom hooks implementation
- Adding features (infinite scroll, debouncing)
- Migration to React Query
- Testing and polish


### Result
The project is deployed on [vercel](https://react-js-interview-task.vercel.app/)
```
`npm run dev` to run locally
`npm run test` to run tests
```
---

## Technical Requirements (The task I recieved)

Build a GitHub repository explorer using GitHub's public API, demonstrating advanced React patterns and micro-frontend architecture. 
#### API Integration: Use GitHub REST API (no auth needed for public data) 
Endpoints to use: 
- Search repositories: GET /search/repositories
- Get repository details: GET /repos/{owner}/{repo}
- Get repository contributors: GET /repos/{owner}/{repo}/contributors
- Get repository languages: GET /repos/{owner}/{repo}/languages

#### Architecture - Micro-frontends: Search Module (Micro-frontend 1)
- Search input with debouncing
- Display search results in a grid/list
- Implement pagination or infinite scroll
- Repository Details Module (Micro-frontend 2)
- Show detailed repository information
- Display contributors list
- Show language breakdown (with a simple chart)
- Star/fork counts with real-time updates

---
