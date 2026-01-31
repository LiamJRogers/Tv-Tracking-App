import React from "react";
import { View, Text } from "react-native";
import Avatar from "../Avatar";
import { FriendUser } from "../../types/friends";
import { getFriendsSince } from "../../utils/friendUtils";
import { styles } from "../../styles/friendDrawerHeader.styles";

type Props = { friend: FriendUser };

export const FriendDrawerHeader: React.FC<Props> = ({ friend }) => (
  <View style={styles.container}>
    <Avatar
      uri={friend.profile_pic_url ?? null}
      size={72}
      style={styles.avatar}
    />
    <View style={styles.info}>
      <Text style={styles.name}>
        {String(friend.name || friend.username || "")}
      </Text>
      <Text style={styles.username}>@{String(friend.username || "")}</Text>
      <Text style={styles.friendsSince}>{getFriendsSince(friend)}</Text>
    </View>
  </View>
);
