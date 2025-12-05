import { ApolloCache } from "@apollo/client";
import { LastMessage } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/messages";
import client from "../constants/apollo-client";

export const updateMessages = async (cache: ApolloCache, message: LastMessage) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: { chatId: message.chat },
  }
    const messages = cache.readQuery({ ...messagesQueryOptions });
    let currentMessages = (messages?.messages || []).concat(message);
    if (messages === null) {
      // get messages
      const chatMessages = await client.query({ query: getMessagesDocument, variables: { chatId: message.chat } });
      currentMessages = chatMessages?.data?.messages || [];
    }
    cache.writeQuery({
      ...messagesQueryOptions,
      data: { messages: currentMessages }
    })
}