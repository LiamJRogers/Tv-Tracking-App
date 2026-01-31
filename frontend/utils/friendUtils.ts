import { FriendUser } from "../types/friends";

export function getFriendsSince(user: FriendUser) {
  if (!user.friends_since) return "";
  const date = new Date(user.friends_since);
  return `Friends since ${date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  })}`;
}
