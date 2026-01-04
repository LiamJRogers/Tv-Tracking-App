import React from "react";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { API_URL } from "../utils/getApiUtils";
import { useAuth } from "./AuthContext";

export function useMySeriesTabData(activeTab: string) {
  const { user } = useAuth();
  const [userWatchlist, setUserWatchlist] = useState<any[]>([]);
  const [userWatching, setUserWatching] = useState<any[]>([]);
  const [userCompleted, setUserCompleted] = useState<any[]>([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [loadingWatching, setLoadingWatching] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWatchlist = async () => {
        if (!user || activeTab !== "Watchlist") return;
        setLoadingWatchlist(true);
        try {
          const res = await fetch(`${API_URL}/watchlist/${user.id}`);
          const data = await res.json();
          setUserWatchlist(data);
        } catch {
          setUserWatchlist([]);
        } finally {
          setLoadingWatchlist(false);
        }
      };
      fetchWatchlist();
    }, [user, activeTab])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchWatching = async () => {
        if (!user || activeTab !== "Watching") return;
        setLoadingWatching(true);
        try {
          const res = await fetch(`${API_URL}/watching/${user.id}`);
          const data = await res.json();
          setUserWatching(data);
        } catch {
          setUserWatching([]);
        } finally {
          setLoadingWatching(false);
        }
      };
      fetchWatching();
    }, [user, activeTab])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchCompleted = async () => {
        if (!user || activeTab !== "Completed") return;
        setLoadingCompleted(true);
        try {
          const res = await fetch(`${API_URL}/completed/${user.id}`);
          const data = await res.json();
          setUserCompleted(data);
        } catch {
          setUserCompleted([]);
        } finally {
          setLoadingCompleted(false);
        }
      };
      fetchCompleted();
    }, [user, activeTab])
  );

  return {
    userWatchlist,
    userWatching,
    userCompleted,
    loadingWatchlist,
    loadingWatching,
    loadingCompleted,
  };
}
