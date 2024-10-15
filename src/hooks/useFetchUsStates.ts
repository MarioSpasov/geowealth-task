import { useQuery } from "@tanstack/react-query";

export const useFetchUsStates = () => {
  const fetchUsStates = async () => {
    try {
      const response = await fetch("../us-states.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch US states: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching US states:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["usStates"],
    queryFn: fetchUsStates,
    staleTime: 600000,
    refetchOnWindowFocus: false,
  });
};
