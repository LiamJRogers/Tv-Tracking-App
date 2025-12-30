import { useState, useEffect } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useWatchlist(seriesId: number) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inWatchlist, setInWatchlist] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API_URL}/watchlist/${user.id}`);
        const data = await res.json();
        setInWatchlist(data.some((s: any) => s.id === seriesId));
      } catch {
        setInWatchlist(false);
      }
    };
    checkWatchlist();
  }, [user, seriesId]);

  const addToWatchlist = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, seriesId }),
      });
      if (response.ok) setInWatchlist(true);
      else {
        const data = await response.json();
        alert(data.error || "Failed to add to watchlist");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/watchlist`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, seriesId }),
      });
      if (response.ok) setInWatchlist(false);
      else {
        const data = await response.json();
        alert(data.error || "Failed to remove from watchlist");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, inWatchlist, addToWatchlist, removeFromWatchlist };
}
