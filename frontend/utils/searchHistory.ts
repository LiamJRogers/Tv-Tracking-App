import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_HISTORY_KEY = "tvtracker_search_history";

export async function saveSearchHistory(query: string) {
  try {
    const existing = JSON.parse(
      (await AsyncStorage.getItem(SEARCH_HISTORY_KEY)) || "[]"
    );
    const updated = [
      query,
      ...existing.filter((q: string) => q !== query),
    ].slice(0, 10);
    await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch {}
}

export async function getSearchHistory(): Promise<string[]> {
  try {
    return JSON.parse((await AsyncStorage.getItem(SEARCH_HISTORY_KEY)) || "[]");
  } catch {
    return [];
  }
}

export async function removeSearchHistoryItem(search: string) {
  try {
    const existing = JSON.parse(
      (await AsyncStorage.getItem(SEARCH_HISTORY_KEY)) || "[]"
    );
    const updated = existing.filter((h: string) => h !== search);
    await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
