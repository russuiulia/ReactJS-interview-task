import type { Repository } from '../types/github';
import { RepoCard } from "./RepoCard";

export const RepoList = ({ repos }: { repos: Repository[] }) => {
  return (
    <div className="repo-list">
      {repos.map((r) => (
        <RepoCard key={r.id} repo={r} />
      ))}
    </div>
  );
};