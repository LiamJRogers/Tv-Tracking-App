import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles as searchStyles } from "../../styles/searchScreen.styles";
import FriendCard from "./FriendCard";
import NoResults from "../NoResults";
import { FriendUser } from "../../types/friends";

type SearchResultsProps = {
  loading: boolean;
  results: FriendUser[];
  friends: FriendUser[];
  pending: FriendUser[];
  requestedState: Record<string, boolean>;
  sendingIds: string[];
  handleSendRequest: (id: string) => void;
  handleCancelRequest: (id: string) => void;
};

export function SearchResults({
  loading,
  results,
  friends,
  pending,
  requestedState,
  sendingIds,
  handleSendRequest,
  handleCancelRequest,
}: SearchResultsProps) {
  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (results.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 32 }}>
        <NoResults />
      </View>
    );
  return (
    <View style={{ paddingHorizontal: 18 }}>
      <Text style={searchStyles.sectionTitle}>Search Results</Text>
      {results.map((u) => {
        const isFriend = friends.some((f) => f.id === u.id);
        const isPendingIncoming = pending.some((p) => p.id === u.id);
        const isRequested = requestedState.hasOwnProperty(u.id)
          ? requestedState[u.id]
          : !!u.requested;
        return (
          <FriendCard
            key={u.id}
            user={u}
            isRequested={isRequested}
            onRequested={() => {
              if (sendingIds.includes(u.id)) return;
              handleCancelRequest(u.id);
            }}
            onAdd={
              !isFriend && !isPendingIncoming && !isRequested
                ? () => {
                    if (sendingIds.includes(u.id)) return;
                    handleSendRequest(u.id);
                  }
                : undefined
            }
          />
        );
      })}
    </View>
  );
}
