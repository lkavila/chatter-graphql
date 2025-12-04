import { ApolloCache } from "@apollo/client";
import { LastMessage } from "../gql/graphql";
import { getChatsDocument } from "../hooks/chats";

export const updateLatestMessage = (
  cache: ApolloCache,
  message: LastMessage,
) => {
  const chats = [...(cache.readQuery({ query: getChatsDocument })?.chats || [])];
  const cachedChat = chats.find((chat) => chat._id === message.chat);
  if (!cachedChat) return
  const cachedChatCopy = { ...cachedChat };
  cachedChatCopy.lastMessage = message;
  const newChats = chats.filter((chat) => (chat._id !== message.chat));
  cache.writeQuery({ query: getChatsDocument, data: { chats: [cachedChatCopy, ...newChats] } });
}