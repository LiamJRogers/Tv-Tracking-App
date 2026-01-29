import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../../styles/friends.styles";
import { styles as searchStyles } from "../../styles/searchScreen.styles";
import FriendSuggestionCard from "./FriendSuggestionCard";
import { FriendUser } from "../../types/friends";

type SuggestionsSectionProps = {
  suggestions: FriendUser[];
  suggestionsLoading: boolean;
  visibleSuggestions: FriendUser[];
  showAllSuggestions: boolean;
  setShowAllSuggestions: (show: boolean | ((prev: boolean) => boolean)) => void;
  sendingIds: string[];
  sendingRequest: boolean;
  requestedState: Record<string, boolean>;
  handleSendRequest: (id: string) => void;
  handleCancelRequest: (id: string) => void;
};

export function SuggestionsSection({
  suggestions,
  suggestionsLoading,
  visibleSuggestions,
  showAllSuggestions,
  setShowAllSuggestions,
  sendingIds,
  sendingRequest,
  requestedState,
  handleSendRequest,
  handleCancelRequest,
}: SuggestionsSectionProps) {
  return (
    <>
      <View style={styles.sectionHeaderRow}>
        <Text style={searchStyles.sectionTitle}>Suggestions</Text>
        {suggestions.length > 4 && (
          <TouchableOpacity onPress={() => setShowAllSuggestions((s) => !s)}>
            <Text style={{ color: "#13A4EC", fontWeight: "600" }}>
              {showAllSuggestions
                ? "See less"
                : `See all (${suggestions.length})`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {suggestionsLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <View style={styles.suggestionsRow}>
          {visibleSuggestions.map((u) => {
            const isSending = sendingIds.includes(u.id);
            const isRequested = requestedState.hasOwnProperty(u.id)
              ? requestedState[u.id]
              : !!u.requested;
            return (
              <FriendSuggestionCard
                key={u.id}
                user={u}
                isRequested={isRequested}
                onAdd={() => {
                  if (isSending || sendingRequest) return;
                  handleSendRequest(u.id);
                }}
                onRequested={() => {
                  if (isSending || sendingRequest) return;
                  handleCancelRequest(u.id);
                }}
              />
            );
          })}
        </View>
      )}
    </>
  );
}
