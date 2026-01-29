import { useEffect, useState, useCallback } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useFriendSuggestions(limit = 8) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useCallback(
    async (l = limit) => {
      if (!user?.id) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/friends/suggestions?userId=${user.id}&limit=${Number(l)}`
        );
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("useFriendSuggestions fetch error:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, limit]
  );

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return { suggestions, loading, refresh: fetchSuggestions };
}
