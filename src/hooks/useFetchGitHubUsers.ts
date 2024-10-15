import { useQuery } from "@tanstack/react-query";

export const useFetchGitHubUsers = (query: string) => {
  const fetchGitHubUsers = async (query: string) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}&per_page=100`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub users: ${response.statusText}`);
    }
    return response.json();
  };
  return useQuery({
    queryKey: ["githubUsers", query],
    queryFn: () => fetchGitHubUsers(query),
    enabled: !!query,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
