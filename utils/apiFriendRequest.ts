import { FriendRequestProps } from "./typescript";

export const fetchRelationship = async (
  senderId: string,
  receiverId: string,
) => {
  const res = await fetch(
    `/api/friend?userId=${senderId}&friendId=${receiverId}`,
  );

  const data = await res.json();
  return data;
};

export const addFriend = async (senderId: string, receiverId: string) => {
  const res = await fetch("/api/friend/add", {
    method: "POST",
    body: JSON.stringify({ senderId: senderId, receiverId: receiverId }),
  });
  const data = await res.json();
  return data;
};

export const cancelAddFriend = async (senderId: string, receiverId: string) => {
  const res = await fetch(
    `/api/friend?userId=${senderId}&friendId=${receiverId}`,
    {
      method: "DELETE",
    },
  );

  const data = await res.json();
  return data;
};

export const acceptAddFriend = async (senderId: string, receiverId: string) => {
  const res = await fetch(
    `/api/friend?userId=${senderId}&friendId=${receiverId}`,
    {
      method: "PATCH",
    },
  );

  const data = await res.json();
  return data;
};

export const getAllFriendsByType = async (id: string, type = "all") => {
  const res = await fetch(`/api/friend/list/${id}?type=${type}`);

  const data: FriendRequestProps[] = await res.json();
  let friends;

  if (type === "all") {
    friends = data.map((friend) => {
      if (friend.senderId._id === id) {
        return friend.receiverId;
      } else {
        return friend.senderId;
      }
    });
  }

  if (type === "requested") {
    friends = data.map((friend) => friend.receiverId);
  }

  if (type === "received") {
    friends = data.map((friend) => friend.senderId);
  }

  return friends;
};
