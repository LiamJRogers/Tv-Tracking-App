export type FriendUser = {
  id: string;
  username: string;
  name: string;
  profile_pic_url?: string;
  friends_since?: string;
};

export type PendingUser = {
  id: string;
  username: string;
  name?: string;
  profile_pic_url?: string;
  requester_id?: string;
};
