import type { Repository } from '../types/github';
import { RepoCard } from "./RepoCard";

export const RepoList = ({ repos }: { repos: Repository[] }) => {
  return (
    <ul className="repo-list" role="list" aria-label="Repository search results">
      {repos.map((r) => (
        <li key={r.id}>
          <RepoCard repo={r} />
        </li>
      ))}
    </ul>
  );
};