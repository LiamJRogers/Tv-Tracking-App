import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useFriends() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFriends = useCallback(async () => {
    if (!user?.id) {
      setFriends([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/friends/list?userId=${user.id}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setFriends(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("useFriends fetch error:", err);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return { friends, loading, refresh: fetchFriends };
}
