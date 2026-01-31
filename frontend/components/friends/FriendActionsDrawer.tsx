import React from "react";
import { View, Text, Modal, Animated, TouchableOpacity } from "react-native";
import { FriendUser } from "../../types/friends";
import { useFriendActions } from "../../hooks/useFriendActions";
import { FriendActionButton } from "./FriendActionButton";
import { FriendDrawerHeader } from "./FriendDrawerHeader";
import { styles } from "../../styles/friendActionDrawer.styles";
import { useDrawerSlideAnim } from "../../hooks/useDrawerSlideAnim";

type FriendActionsDrawerProps = {
  friend: FriendUser | null;
  onClose: () => void;
  refreshFriends: () => void;
};

const FriendActionsDrawer: React.FC<FriendActionsDrawerProps> = ({
  friend,
  onClose,
  refreshFriends,
}) => {
  const { removeFriend, blockFriend, loading } = useFriendActions();
  const slideAnim = useDrawerSlideAnim(!!friend);

  return (
    <Modal
      visible={!!friend}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}
        >
          {friend && (
            <>
              <FriendDrawerHeader friend={friend} />

              <FriendActionButton
                icon="notifications-off"
                iconColor="#64748B"
                text="Mute Activity"
                textColor="#334155"
                onPress={() => {
                  // TODO: Implement mute activity
                }}
              />

              <FriendActionButton
                icon="person-remove-alt-1"
                iconColor="#DC2E2D"
                text="Remove Friend"
                textColor="#DC2E2D"
                disabled={loading}
                onPress={async () => {
                  if (!friend) return;
                  const ok = await removeFriend(friend.id);
                  if (ok) {
                    onClose();
                    refreshFriends();
                  }
                }}
              />

              <FriendActionButton
                icon="block"
                iconColor="#DC2E2D"
                text="Block"
                textColor="#DC2E2D"
                disabled={loading}
                onPress={async () => {
                  if (!friend) return;
                  const ok = await blockFriend(friend.id);
                  if (ok) {
                    onClose();
                    refreshFriends();
                  }
                }}
              />

              <View style={styles.spacer} />
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FriendActionsDrawer;
