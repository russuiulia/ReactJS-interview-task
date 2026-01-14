import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useRepoDetails } from "../utils/repo/useRepoDetails";
import { Loader } from "../components/Loader";
import { ErrorState } from "../components/ErrorState";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];
const REFRESH_INTERVAL = 30000; // 30 seconds

export const RepoPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const timerRef = useRef<HTMLSpanElement>(null);

  const { repo, contributors, languages, loading, error } = useRepoDetails(
    owner || "",
    name || "",
    refreshKey
  );

  // Prepare language data for chart (memoized to prevent re-renders)
  const languageData = useMemo(() => {
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(languages).map(([name, bytes]) => ({
      name,
      value: bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1)
    }));
  }, [languages]);

  // Update timer display directly without re-rendering
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current) {
        const seconds = Math.floor((Date.now() - lastRefresh) / 1000);
        timerRef.current.textContent = `Updated ${seconds}s ago`;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastRefresh]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
      setLastRefresh(Date.now());
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Manual refresh
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLastRefresh(Date.now());
  };

  if (!owner || !name) {
    return <ErrorState message="Invalid repository URL" />;
  }

  if (loading && !repo) return <Loader />;
  if (error) return <ErrorState message={error} />;
  if (!repo) return <ErrorState message="Repository not found" />;

  return (
    <div className="repo-page">
      <div className="repo-header">
        <h1>{repo.full_name}</h1>
        <div className="refresh-controls">
          <span className="refresh-timer" ref={timerRef}>
            Updated 0s ago
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`refresh-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      <div className="repo-stats">
        <div className="stat-card">
          <strong>⭐ {repo.stargazers_count.toLocaleString()}</strong> stars
        </div>
        <div className="stat-card">
          <strong>🍴 {repo.forks_count.toLocaleString()}</strong> forks
        </div>
      </div>

      <div className="repo-content">
        <div className="languages-section">
          <h2>Languages</h2>
          {languageData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${entry.percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number | undefined) => value ? `${value.toLocaleString()} bytes` : '0 bytes'}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="language-bars">
                {languageData.map((lang, index) => (
                  <div key={lang.name} className="language-item">
                    <div className="language-info">
                      <span className="language-name">
                        <span
                          className="language-color"
                          style={{ background: COLORS[index % COLORS.length] }}
                        />
                        {lang.name}
                      </span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="language-bar-container">
                      <div
                        className="language-bar"
                        style={{
                          width: `${lang.percentage}%`,
                          background: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No language data available</p>
          )}
        </div>

        <div className="contributors-section">
          <h2>Top Contributors</h2>
          {contributors.length > 0 ? (
            <div className="contributors-list">
              {contributors.slice(0, 10).map((c) => (
                <div key={c.id} className="contributor-card">
                  <img
                    src={c.avatar_url}
                    alt={`${c.login}'s avatar`}
                    width={40}
                    height={40}
                    className="contributor-avatar"
                  />
                  <div className="contributor-info">
                    <div className="contributor-name">{c.login}</div>
                    <div className="contributor-contributions">
                      {c.contributions.toLocaleString()} contributions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No contributors found</p>
          )}
        </div>
      </div>

      <div className="refresh-notice">
        <small>
          💡 This page automatically refreshes every 30 seconds to show the latest star and fork counts
        </small>
      </div>
    </div>
  );
};