import { ApolloCache } from "@apollo/client";
import { ChatDocumentWithLastMessage } from "../gql/graphql";
import { getChatsDocument } from "../hooks/chats";

export const updateLatestChats = (
  cache: ApolloCache,
  chat: ChatDocumentWithLastMessage,
) => {
  const chats = [...(cache.readQuery({ query: getChatsDocument })?.chats || [])];
  cache.writeQuery({ query: getChatsDocument, data: { chats: [chat, ...chats] } });
}