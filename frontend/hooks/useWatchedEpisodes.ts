import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

type BatchQueue = { add: number[]; remove: number[] };

export function useWatchedEpisodes(seriesId: number) {
  const { user } = useAuth();
  const [watched, setWatched] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const batchQueue = useRef<BatchQueue>({ add: [], remove: [] });
  const batchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchWatched = useCallback(() => {
    if (!user || !seriesId) return;
    setLoading(true);
    fetch(`${API_URL}/watched-episodes/${user.id}/${seriesId}`)
      .then((res) => res.json())
      .then((data: number[]) => setWatched(data))
      .catch(() => setWatched([]))
      .finally(() => setLoading(false));
  }, [user, seriesId]);

  useEffect(() => {
    fetchWatched();
    return () => {
      if (batchTimeout.current) clearTimeout(batchTimeout.current);
    };
  }, [fetchWatched]);

  const flushBatch = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { add, remove } = batchQueue.current;
    batchQueue.current = { add: [], remove: [] };
    try {
      if (add.length) {
        await fetch(`${API_URL}/watched-episodes/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, episodeIds: add, seriesId }),
        });
      }
      if (remove.length) {
        await fetch(`${API_URL}/watched-episodes/batch-delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, episodeIds: remove }),
        });
      }
      fetchWatched();
    } catch {
      // TODO: handle error
    } finally {
      setLoading(false);
    }
  }, [user, seriesId, fetchWatched]);

  const scheduleBatch = useCallback(() => {
    if (batchTimeout.current) clearTimeout(batchTimeout.current);
    batchTimeout.current = setTimeout(flushBatch, 500);
  }, [flushBatch]);

  const markWatched = useCallback(
    (episodeId: number) => {
      setWatched((prev) =>
        prev.includes(episodeId) ? prev : [...prev, episodeId]
      );
      batchQueue.current.add.push(episodeId);
      scheduleBatch();
    },
    [scheduleBatch]
  );

  const unmarkWatched = useCallback(
    (episodeId: number) => {
      setWatched((prev) => prev.filter((id) => id !== episodeId));
      batchQueue.current.remove.push(episodeId);
      scheduleBatch();
    },
    [scheduleBatch]
  );

  return {
    watched,
    loading,
    markWatched,
    unmarkWatched,
    refresh: fetchWatched,
  };
}
