import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Avatar from "../Avatar";
import { FriendUser } from "../../types/friends";
import { friendCardStyles as styles } from "../../styles/friendCard.styles";

type Props = {
  user: FriendUser;
  onMore?: () => void;
  onAdd?: () => void;
  isRequested?: boolean;
  onRequested?: () => void;
};

export default function FriendCard({
  user,
  onMore,
  onAdd,
  isRequested = false,
  onRequested,
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

      {isRequested ? (
        <TouchableOpacity style={styles.requestedButton} onPress={onRequested}>
          <Text style={styles.requestedButtonText}>Requested</Text>
        </TouchableOpacity>
      ) : (
        onAdd && (
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Add Friend</Text>
          </TouchableOpacity>
        )
      )}

      {onMore && (
        <TouchableOpacity style={styles.moreButton} onPress={onMore}>
          <MaterialIcons name="more-vert" size={28} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );
}
