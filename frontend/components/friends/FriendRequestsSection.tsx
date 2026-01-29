import React, { useCallback } from "react";
import { View, Text, Alert } from "react-native";
import { styles as searchStyles } from "../../styles/searchScreen.styles";
import FriendRequestCard from "./FriendRequestCard";
import { FriendUser, PendingUser } from "../../types/friends";

type FriendRequestsSectionProps = {
  pending: PendingUser[];
  actionLoading: boolean;
  acceptRequest: (id: string) => Promise<boolean>;
  rejectRequest: (id: string) => Promise<boolean>;
  fetchPending: () => void;
  refreshFriends: () => void;
};

export function FriendRequestsSection({
  pending,
  actionLoading,
  acceptRequest,
  rejectRequest,
  fetchPending,
  refreshFriends,
}: FriendRequestsSectionProps) {
  const handleAccept = useCallback(
    async (requesterId: string) => {
      if (actionLoading) return;
      const ok = await acceptRequest(requesterId);
      if (ok) {
        fetchPending();
        refreshFriends();
      } else {
        Alert.alert("Could not accept", "Please try again");
      }
    },
    [actionLoading, acceptRequest, fetchPending, refreshFriends],
  );

  const handleDecline = useCallback(
    async (requesterId: string) => {
      if (actionLoading) return;
      const ok = await rejectRequest(requesterId);
      if (ok) {
        fetchPending();
      } else {
        Alert.alert("Could not decline", "Please try again");
      }
    },
    [actionLoading, rejectRequest, fetchPending],
  );

  if (pending.length === 0) return null;

  return (
    <View style={{ paddingHorizontal: 18 }}>
      <Text style={searchStyles.sectionTitle}>Friend Requests</Text>
      {pending.map((u) => {
        const requesterId = u.requester_id || u.id;
        const user: FriendUser = {
          id: u.id,
          username: u.username,
          name: u.name,
          profile_pic_url: u.profile_pic_url,
        };
        return (
          <FriendRequestCard
            key={requesterId}
            user={user}
            onAccept={() => handleAccept(requesterId)}
            onDecline={() => handleDecline(requesterId)}
          />
        );
      })}
    </View>
  );
}
