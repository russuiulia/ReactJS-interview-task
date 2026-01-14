import { RepoCard } from "./RepoCard";

export const RepoList = ({ repos }: { repos: any[] }) => {
  return (
    <div className="repo-list">
      {repos.map((r) => (
        <RepoCard key={r.id} repo={r} />
      ))}
    </div>
  );
};