import { Alert } from "react-native";

export async function handleSendRequest(
  friendId: string,
  sendingIds: string[],
  setSendingIds: React.Dispatch<React.SetStateAction<string[]>>,
  setRequestedState: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  sendFriendRequest: (friendId: string) => Promise<boolean>,
) {
  if (sendingIds.includes(friendId)) return;
  setSendingIds((s) => [...s, friendId]);
  setRequestedState((m) => ({ ...m, [friendId]: true }));

  try {
    const ok = await sendFriendRequest(friendId);
    if (!ok) {
      setRequestedState((m) => {
        const copy = { ...m };
        delete copy[friendId];
        return copy;
      });
      Alert.alert("Could not send request", "Please try again.");
    }
  } catch (err) {
    setRequestedState((m) => {
      const copy = { ...m };
      delete copy[friendId];
      return copy;
    });
    Alert.alert("Error", "Something went wrong.");
  } finally {
    setSendingIds((s) => s.filter((id) => id !== friendId));
  }
}

export async function handleCancelRequest(
  friendId: string,
  sendingIds: string[],
  setSendingIds: React.Dispatch<React.SetStateAction<string[]>>,
  requestedState: Record<string, boolean>,
  setRequestedState: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  cancelFriendRequest: (friendId: string) => Promise<boolean>,
  refresh: () => void,
  fetchPending: () => void,
  refreshFriends: () => void,
) {
  if (sendingIds.includes(friendId)) return;
  setSendingIds((s) => [...s, friendId]);
  const had = Object.prototype.hasOwnProperty.call(requestedState, friendId)
    ? requestedState[friendId]
    : undefined;
  setRequestedState((m) => ({ ...m, [friendId]: false }));

  try {
    const ok = await cancelFriendRequest(friendId);
    if (!ok) {
      setRequestedState((m) => {
        const copy = { ...m };
        if (had === undefined) delete copy[friendId];
        else copy[friendId] = had;
        return copy;
      });
      Alert.alert("Could not cancel request", "Please try again.");
    } else {
      refresh();
      fetchPending();
      refreshFriends();
    }
  } catch (err) {
    setRequestedState((m) => {
      const copy = { ...m };
      if (had === undefined) delete copy[friendId];
      else copy[friendId] = had;
      return copy;
    });
    Alert.alert("Error", "Something went wrong.");
  } finally {
    setSendingIds((s) => s.filter((id) => id !== friendId));
  }
}
