// import { renderHook, waitFor } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { useRepoDetails } from '../useRepoDetails';
// import * as githubApi from '../../../api/github';

// vi.mock('../../api/github');

// describe('useRepoDetails', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should initialize with loading state', () => {
//     vi.mocked(githubApi.getRepoDetails).mockImplementation(() => new Promise(() => { }));
//     vi.mocked(githubApi.getRepoContributors).mockImplementation(() => new Promise(() => { }));
//     vi.mocked(githubApi.getRepoLanguages).mockImplementation(() => new Promise(() => { }));

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     expect(result.current.loading).toBe(true);
//     expect(result.current.repo).toBeNull();
//     expect(result.current.contributors).toEqual([]);
//     expect(result.current.languages).toEqual({});
//     expect(result.current.error).toBeNull();
//   });

//   it('should fetch and return repo details successfully', async () => {
//     const mockRepo = { id: 1, name: 'test-repo', description: 'Test' };
//     const mockContributors = [{ login: 'user1', contributions: 10 }];
//     const mockLanguages = { TypeScript: 1000, JavaScript: 500 };

//     vi.mocked(githubApi.getRepoDetails).mockResolvedValue(mockRepo);
//     vi.mocked(githubApi.getRepoContributors).mockResolvedValue(mockContributors);
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue(mockLanguages);

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.repo).toEqual(mockRepo);
//     expect(result.current.contributors).toEqual(mockContributors);
//     expect(result.current.languages).toEqual(mockLanguages);
//     expect(result.current.error).toBeNull();
//   });

//   it('should handle fetch errors', async () => {
//     const errorMessage = 'Network error';
//     vi.mocked(githubApi.getRepoDetails).mockRejectedValue(new Error(errorMessage));
//     vi.mocked(githubApi.getRepoContributors).mockResolvedValue([]);
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue({});

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.error).toBe(errorMessage);
//     expect(result.current.repo).toBeNull();
//   });

//   it('should handle rate limit errors', async () => {
//     vi.mocked(githubApi.getRepoDetails).mockRejectedValue(new Error('GitHub API rate limit exceeded'));
//     vi.mocked(githubApi.getRepoContributors).mockResolvedValue([]);
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue({});

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.error).toBe('GitHub API rate limit exceeded');
//   });

//   it('should abort request on unmount', async () => {
//     const abortSpy = vi.fn();
//     vi.mocked(githubApi.getRepoDetails).mockImplementation((owner, name, signal) => {
//       signal?.addEventListener('abort', abortSpy);
//       return new Promise(() => { });
//     });
//     vi.mocked(githubApi.getRepoContributors).mockImplementation(() => new Promise(() => { }));
//     vi.mocked(githubApi.getRepoLanguages).mockImplementation(() => new Promise(() => { }));

//     const { unmount } = renderHook(() => useRepoDetails('owner', 'repo'));

//     unmount();

//     await waitFor(() => {
//       expect(abortSpy).toHaveBeenCalled();
//     });
//   });

//   it('should refetch when owner or name changes', async () => {
//     const mockRepo1 = { id: 1, name: 'repo1' };
//     const mockRepo2 = { id: 2, name: 'repo2' };

//     vi.mocked(githubApi.getRepoDetails).mockResolvedValueOnce(mockRepo1);
//     vi.mocked(githubApi.getRepoContributors).mockResolvedValue([]);
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue({});

//     const { result, rerender } = renderHook(
//       ({ owner, name }) => useRepoDetails(owner, name),
//       { initialProps: { owner: 'owner1', name: 'repo1' } }
//     );

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.repo).toEqual(mockRepo1);

//     vi.mocked(githubApi.getRepoDetails).mockResolvedValueOnce(mockRepo2);

//     rerender({ owner: 'owner2', name: 'repo2' });

//     await waitFor(() => {
//       expect(result.current.repo).toEqual(mockRepo2);
//     });

//     expect(githubApi.getRepoDetails).toHaveBeenCalledTimes(2);
//   });

//   it('should ignore AbortError', async () => {
//     const abortError = new Error('Aborted');
//     abortError.name = 'AbortError';

//     vi.mocked(githubApi.getRepoDetails).mockRejectedValue(abortError);
//     vi.mocked(githubApi.getRepoContributors).mockResolvedValue([]);
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue({});

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.error).toBeNull();
//   });

//   it('should not update state if component unmounts during fetch', async () => {
//     vi.mocked(githubApi.getRepoDetails).mockImplementation(() =>
//       new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'test' }), 100))
//     );
//     vi.mocked(githubApi.getRepoContributors).mockImplementation(() => new Promise(() => { }));
//     vi.mocked(githubApi.getRepoLanguages).mockImplementation(() => new Promise(() => { }));

//     const { result, unmount } = renderHook(() => useRepoDetails('owner', 'repo'));

//     expect(result.current.loading).toBe(true);

//     unmount();

//     await new Promise(resolve => setTimeout(resolve, 150));

//     expect(result.current.loading).toBe(true);
//   });

//   it('should handle partial failures gracefully', async () => {
//     const mockRepo = { id: 1, name: 'test-repo' };

//     vi.mocked(githubApi.getRepoDetails).mockResolvedValue(mockRepo);
//     vi.mocked(githubApi.getRepoContributors).mockRejectedValue(new Error('Contributors failed'));
//     vi.mocked(githubApi.getRepoLanguages).mockResolvedValue({});

//     const { result } = renderHook(() => useRepoDetails('owner', 'repo'));

//     await waitFor(() => {
//       expect(result.current.loading).toBe(false);
//     });

//     expect(result.current.error).toBe('Contributors failed');
//   });
// });
