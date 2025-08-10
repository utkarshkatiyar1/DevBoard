import { cache } from "react";

export const getPublicProfileData = cache(async (username: string) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
  const res = await fetch(`${backendUrl}/api/public/profile/${username}`, {
    next: { revalidate: 900 },
  });

  if (!res.ok) return null;
  return res.json();
});
