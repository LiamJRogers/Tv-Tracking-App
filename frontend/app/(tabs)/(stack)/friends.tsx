import React from "react";
import { View, ScrollView } from "react-native";
import TopBar from "../../../components/TopBar";
import { styles } from "../../../styles/friends.styles";
import { useFriendsScreen } from "../../../hooks/useFriendsScreen";
import { FriendsSearchBar } from "../../../components/friends/FriendsSearchBar";
import { SearchResults } from "../../../components/friends/SearchResults";
import { SuggestionsSection } from "../../../components/friends/SuggestionsSection";
import { FriendRequestsSection } from "../../../components/friends/FriendRequestsSection";
import { FriendsList } from "../../../components/friends/FriendsList";

export default function FriendsScreen() {
  const {
    query,
    setQuery,
    searchLoading,
    clear,
    filteredResults,
    showAllSuggestions,
    setShowAllSuggestions,
    suggestions,
    suggestionsLoading,
    visibleSuggestions,
    sendingIds,
    sendingRequest,
    requestedState,
    pending,
    actionLoading,
    fetchPending,
    acceptRequest,
    rejectRequest,
    friends,
    refreshFriends,
    handleSendRequest,
    handleCancelRequest,
  } = useFriendsScreen();

  return (
    <View style={styles.container}>
      <TopBar
        showBackButton
        showBorder={false}
        showSearch={false}
        showFriends={false}
        heading="Friends"
      />
      <FriendsSearchBar query={query} setQuery={setQuery} clear={clear} />
      <View style={styles.section}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}>
          {query.length > 0 ? (
            <SearchResults
              loading={searchLoading}
              results={filteredResults}
              friends={friends}
              pending={pending}
              requestedState={requestedState}
              sendingIds={sendingIds}
              handleSendRequest={handleSendRequest}
              handleCancelRequest={handleCancelRequest}
            />
          ) : (
            <>
              <SuggestionsSection
                suggestions={suggestions}
                suggestionsLoading={suggestionsLoading}
                visibleSuggestions={visibleSuggestions}
                showAllSuggestions={showAllSuggestions}
                setShowAllSuggestions={setShowAllSuggestions}
                sendingIds={sendingIds}
                sendingRequest={sendingRequest}
                requestedState={requestedState}
                handleSendRequest={handleSendRequest}
                handleCancelRequest={handleCancelRequest}
              />
              <FriendRequestsSection
                pending={pending}
                actionLoading={actionLoading}
                acceptRequest={acceptRequest}
                rejectRequest={rejectRequest}
                fetchPending={fetchPending}
                refreshFriends={refreshFriends}
              />
              <FriendsList friends={friends} refreshFriends={refreshFriends} />
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
