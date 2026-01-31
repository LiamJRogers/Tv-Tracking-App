import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/friends.styles";
import { styles as searchStyles } from "../../styles/searchScreen.styles";
import FriendCard from "./FriendCard";
import { NoFriends } from "./NoFriends";
import { FriendUser } from "../../types/friends";
import FriendActionsDrawer from "./FriendActionsDrawer";

type FriendsListProps = {
  friends: FriendUser[];
  refreshFriends: () => void;
};

export function FriendsList({ friends, refreshFriends }: FriendsListProps) {
  const [selectedFriend, setSelectedFriend] = useState<FriendUser | null>(null);

  return (
    <View style={{ paddingHorizontal: 18 }}>
      <Text style={[searchStyles.sectionTitle, { marginBottom: 12 }]}>
        Your Friends
      </Text>
      {friends.length === 0 ? (
        <NoFriends />
      ) : (
        friends.map((u) => (
          <FriendCard key={u.id} user={u} onMore={() => setSelectedFriend(u)} />
        ))
      )}

      <FriendActionsDrawer
        friend={selectedFriend}
        onClose={() => setSelectedFriend(null)}
        refreshFriends={refreshFriends}
      />
    </View>
  );
}
