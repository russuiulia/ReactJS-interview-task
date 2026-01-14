import { Link } from "react-router-dom";
import type { Repository } from '../types/github';

export const RepoCard = ({ repo }: { repo: Repository }) => (
  <div className="repo-card">
    <h3>
      <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
    </h3>
    <p>{repo.description}</p>
    <p>{repo.stargazers_count} stars | {repo.forks_count} forks</p>
  </div>
);
