import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "../Avatar";
import { FriendUser } from "../../types/friends";
import { friendSuggestionCardStyles as styles } from "../../styles/friendSuggestionCard.styles";

type Props = {
  user: FriendUser;
  onAdd?: () => void;
  isRequested?: boolean;
  onRequested?: () => void;
};

export default function FriendSuggestionCard({
  user,
  onAdd,
  isRequested = false,
  onRequested,
}: Props) {
  const SUGGESTION_AVATAR = 65;
  return (
    <View style={styles.container}>
      <Avatar uri={user.profile_pic_url ?? null} size={SUGGESTION_AVATAR} />
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isRequested ? "#E5E7EB" : "#13A4EC",
            right: 8,
            top: SUGGESTION_AVATAR - 24,
          },
        ]}
        onPress={isRequested ? onRequested : onAdd}
      >
        {isRequested ? (
          <Text style={styles.requestedText}>✓</Text>
        ) : (
          <MaterialCommunityIcons name="plus" size={18} color="#fff" />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{user.name || user.username}</Text>
      <Text style={styles.username}>@{user.username}</Text>
    </View>
  );
}
