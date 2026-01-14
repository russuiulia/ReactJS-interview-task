Build a GitHub repository explorer using GitHub's public API, demonstrating advanced React patterns and micro-frontend architecture.
Technical Requirements
API Integration:

Use GitHub REST API (no auth needed for public data)
Endpoints to use:
Search repositories: GET /search/repositories
Get repository details: GET /repos/{owner}/{repo}
Get repository contributors: GET /repos/{owner}/{repo}/contributors
Get repository languages: GET /repos/{owner}/{repo}/languages


(can ignore this part of the task) Architecture - Micro-frontends:

Search Module (Micro-frontend 1)
Search input with debouncing
Display search results in a grid/list
Implement pagination or infinite scroll
Repository Details Module (Micro-frontend 2)
Show detailed repository information
Display contributors list
Show language breakdown (with a simple chart)
Star/fork counts with real-time updates