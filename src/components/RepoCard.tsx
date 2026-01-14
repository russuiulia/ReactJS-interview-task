import { Link } from "react-router-dom";

export const RepoCard = ({ repo }: { repo: any }) => (
  <div className="repo-card">
    <h3>
      <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
    </h3>
    <p>{repo.description}</p>
    <p>{repo.stargazers_count} stars | {repo.forks_count} forks</p>
  </div>
);
