import useSWR, { mutate } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useUser() {
  const { data, error, isLoading , mutate} = useSWR("/api/auth/user", fetcher);
  return { user: data, isLoading, isError: error , mutate};
}

export function useGitHubData() {
  const { data, error, isLoading , mutate} = useSWR("/api/github", fetcher);
  return { data, isLoading, isError: error , mutate};
}
