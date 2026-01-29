import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Avatar from "../Avatar";
import { FriendUser } from "../../types/friends";
import { friendRequestCardStyles as styles } from "../../styles/friendRequestCard.styles";

type Props = {
  user: FriendUser;
  onAccept?: () => void;
  onDecline?: () => void;
};

export default function FriendRequestCard({
  user,
  onAccept,
  onDecline,
}: Props) {
  return (
    <View style={styles.container}>
      <Avatar
        uri={user.profile_pic_url ?? null}
        size={56}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name || user.username}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={onAccept}
        accessibilityLabel="Accept friend request"
      >
        <MaterialIcons name="check" size={18} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.declineButton}
        onPress={onDecline}
        accessibilityLabel="Decline friend request"
      >
        <MaterialIcons name="close" size={18} color="#64748B" />
      </TouchableOpacity>
    </View>
  );
}
