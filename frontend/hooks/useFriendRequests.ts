import { useEffect, useState, useCallback } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useFriendRequests() {
  const { user } = useAuth();
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPending = useCallback(async () => {
    if (!user?.id) {
      setPending([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/friends/requests?userId=${user.id}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("useFriendRequests fetch error:", err);
      setPending([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const acceptRequest = useCallback(
    async (requesterId: string) => {
      if (!user?.id) return false;
      setActionLoading(true);
      try {
        const res = await fetch(`${API_URL}/friends/accept`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, friendId: requesterId }),
        });
        if (!res.ok) throw new Error("Accept failed");
        await fetchPending();
        return true;
      } catch (err) {
        console.error("acceptRequest error:", err);
        return false;
      } finally {
        setActionLoading(false);
      }
    },
    [user?.id, fetchPending]
  );

  const rejectRequest = useCallback(
    async (requesterId: string) => {
      if (!user?.id) return false;
      setActionLoading(true);
      try {
        const res = await fetch(`${API_URL}/friends/reject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, friendId: requesterId }),
        });
        if (!res.ok) throw new Error("Reject failed");
        await fetchPending();
        return true;
      } catch (err) {
        console.error("rejectRequest error:", err);
        return false;
      } finally {
        setActionLoading(false);
      }
    },
    [user?.id, fetchPending]
  );

  return {
    pending,
    loading,
    actionLoading,
    fetchPending,
    acceptRequest,
    rejectRequest,
  };
}
