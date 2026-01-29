import React from "react";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles } from "../../styles/friends.styles";

export function NoFriends() {
  return (
    <View style={styles.noFriendsContainer}>
      <MaterialIcons
        name="group"
        size={64}
        color="#D1D5DB"
        style={styles.noFriendsIcon}
      />
      <Text style={styles.noFriendsTitle}>No friends yet</Text>
      <Text style={styles.noFriendsText}>
        You haven’t added any friends yet. Search for people above and send them
        a friend request!
      </Text>
    </View>
  );
}
