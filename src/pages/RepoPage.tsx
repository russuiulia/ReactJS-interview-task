import { useParams } from "react-router-dom";
import { useRepoDetails } from "../utils/repo/useRepoDetails";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";

export const RepoPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  
  const { repo, contributors, languages, loading, error } = useRepoDetails(
    owner || "", 
    name || ""
  );

  if (!owner || !name) {
    return <ErrorState message="Invalid repository URL" />;
  }

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;
  
  if (!repo) return <ErrorState message="Repository not found" />;

  return (
    <div>
      <h1>{repo.full_name}</h1>
      {repo.description && <p>{repo.description}</p>}
      <p>⭐ {repo.stargazers_count} stars | 🍴 {repo.forks_count} forks</p>

      <h2>Languages</h2>
      {Object.keys(languages).length > 0 ? (
        <ul>
          {Object.keys(languages).map((lang) => (
            <li key={lang}>
              {lang}: {languages[lang]} bytes
            </li>
          ))}
        </ul>
      ) : (
        <p>No language data available</p>
      )}

      <h2>Contributors</h2>
      {contributors.length > 0 ? (
        <ul>
          {contributors.map((c) => (
            <li key={c.id}>
              <img src={c.avatar_url} alt={`${c.login}'s avatar`} width={30} height={30} />
              {c.login} ({c.contributions} contributions)
            </li>
          ))}
        </ul>
      ) : (
        <p>No contributors found</p>
      )}
    </div>
  );
};