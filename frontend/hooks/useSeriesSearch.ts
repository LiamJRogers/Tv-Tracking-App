import { useState, useRef, useEffect } from "react";
import { API_URL } from "../utils/getApiUtils";
import {
  saveSearchHistory,
  getSearchHistory,
  removeSearchHistoryItem,
} from "../utils/searchHistory";

export function useSeriesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getSearchHistory().then(setHistory);
    fetch(`${API_URL}/trending-searches`)
      .then((res) => res.json())
      .then(setTrendingSearches)
      .catch(() => setTrendingSearches([]));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_URL}/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const handleSubmitSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    await saveSearchHistory(query);
    setHistory((prev) =>
      [query, ...prev.filter((h) => h !== query)].slice(0, 10)
    );
  };

  const handleSeriesResultPress = async (
    item: any,
    onSeriesPress: (item: any) => void
  ) => {
    await saveSearchHistory(item.name);
    setHistory((prev) =>
      [item.name, ...prev.filter((h) => h !== item.name)].slice(0, 10)
    );
    onSeriesPress(item);
  };

  const handleHistoryPress = (q: string) => {
    setQuery(q);
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  const handleRemoveHistory = async (search: string) => {
    const updated = await removeSearchHistoryItem(search);
    setHistory(updated);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    history,
    hasSearched,
    trendingSearches,
    handleSubmitSearch,
    handleSeriesResultPress,
    handleHistoryPress,
    handleClearSearch,
    handleRemoveHistory,
  };
}
