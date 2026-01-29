import { useState, useCallback } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useFriendActions() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = useCallback(
    async (friendId: string) => {
      if (!user?.id) {
        console.warn("sendFriendRequest: user not authenticated");
        return false;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/friends/request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, friendId }),
        });
        return res.ok;
      } catch (err) {
        console.error("sendFriendRequest error:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const cancelFriendRequest = useCallback(
    async (friendId: string) => {
      if (!user?.id) {
        console.warn("cancelFriendRequest: user not authenticated");
        return false;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/friends/withdraw`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, friendId }),
        });
        return res.ok;
      } catch (err) {
        console.error("cancelFriendRequest error:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  return { sendFriendRequest, cancelFriendRequest, loading };
}
