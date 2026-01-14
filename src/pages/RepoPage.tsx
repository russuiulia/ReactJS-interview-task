import { useParams } from "react-router-dom";
import { useRepoDetails } from "../utils/repo/useRepoDetails";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/Error";

export const RepoPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { repo, contributors, languages, loading, error } = useRepoDetails(owner!, name!);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <h1>{repo.full_name}</h1>
      <p>{repo.description}</p>
      <p> {repo.stargazers_count} stars | {repo.forks_count} forks</p>

      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((lang) => (
          <li key={lang}>{lang}: {languages[lang]}</li>
        ))}
      </ul>

      <h2>Contributors</h2>
      <ul>
        {contributors.map((c) => (
          <li key={c.id}>
            <img src={c.avatar_url} alt={c.login} width={30} />
            {c.login} ({c.contributions})
          </li>
        ))}
      </ul>
    </div>
  );
};
