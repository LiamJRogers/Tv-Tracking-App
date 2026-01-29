import { useState } from "react";
import { useUserSearch } from "../hooks/useUserSearch";
import { useFriendSuggestions } from "../hooks/useFriendSuggestions";
import { useFriendActions } from "../hooks/useFriendActions";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useFriends } from "../hooks/useFriends";
import {
  handleSendRequest,
  handleCancelRequest,
} from "../utils/friendRequestHandlers";

export function useFriendsScreen() {
  const {
    query,
    setQuery,
    results: searchResults,
    loading: searchLoading,
    clear,
  } = useUserSearch();
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const {
    suggestions,
    loading: suggestionsLoading,
    refresh,
  } = useFriendSuggestions(8);

  const {
    sendFriendRequest,
    cancelFriendRequest,
    loading: sendingRequest,
  } = useFriendActions();
  const [sendingIds, setSendingIds] = useState<string[]>([]);
  const [requestedState, setRequestedState] = useState<Record<string, boolean>>(
    {},
  );

  const {
    pending,
    loading: pendingLoading,
    actionLoading,
    fetchPending,
    acceptRequest,
    rejectRequest,
  } = useFriendRequests();

  const {
    friends,
    loading: friendsLoading,
    refresh: refreshFriends,
  } = useFriends();

  const filteredResults =
    query.length > 0
      ? searchResults.filter(
          (u) =>
            (u.username || "").toLowerCase().includes(query.toLowerCase()) ||
            (u.name || "").toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  const visibleSuggestions = showAllSuggestions
    ? suggestions
    : suggestions.slice(0, 4);

  async function onSendRequest(friendId: string) {
    await handleSendRequest(
      friendId,
      sendingIds,
      setSendingIds,
      setRequestedState,
      sendFriendRequest,
    );
  }

  async function onCancelRequest(friendId: string) {
    await handleCancelRequest(
      friendId,
      sendingIds,
      setSendingIds,
      requestedState,
      setRequestedState,
      cancelFriendRequest,
      refresh,
      fetchPending,
      refreshFriends,
    );
  }

  return {
    query,
    setQuery,
    searchResults,
    searchLoading,
    clear,
    showAllSuggestions,
    setShowAllSuggestions,
    suggestions,
    suggestionsLoading,
    refresh,
    sendFriendRequest,
    cancelFriendRequest,
    sendingRequest,
    sendingIds,
    setSendingIds,
    requestedState,
    setRequestedState,
    pending,
    pendingLoading,
    actionLoading,
    fetchPending,
    acceptRequest,
    rejectRequest,
    friends,
    friendsLoading,
    refreshFriends,
    filteredResults,
    visibleSuggestions,
    handleSendRequest: onSendRequest,
    handleCancelRequest: onCancelRequest,
  };
}
