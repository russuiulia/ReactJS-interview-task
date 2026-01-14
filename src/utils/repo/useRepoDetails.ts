import { useState, useEffect } from "react";
import { getRepoDetails, getRepoContributors, getRepoLanguages } from "../../api/github";

export const useRepoDetails = (owner: string, name: string) => {
  const [repo, setRepo] = useState<any>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getRepoDetails(owner, name),
      getRepoContributors(owner, name),
      getRepoLanguages(owner, name),
    ])
      .then(([repoData, contributorsData, languagesData]) => {
        setRepo(repoData);
        setContributors(contributorsData);
        setLanguages(languagesData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [owner, name]);

  return { repo, contributors, languages, loading, error };
};
