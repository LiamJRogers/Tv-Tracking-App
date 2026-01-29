import { useEffect, useRef, useState } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useUserSearch(debounceMs = 250) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        if (!user?.id) {
          setResults([]);
          setLoading(false);
          return;
        }
        const res = await fetch(
          `${API_URL}/users/search?q=${encodeURIComponent(query)}&userId=${
            user.id
          }`,
        );
        if (!res.ok) {
          setResults([]);
        } else {
          const data = await res.json();
          setResults(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("useUserSearch fetch error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, user?.id, debounceMs]);

  const clear = () => {
    setQuery("");
    setResults([]);
    setLoading(false);
  };

  return { query, setQuery, results, loading, clear };
}
