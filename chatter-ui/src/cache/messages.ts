import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/chats";

export const updateMessages = (cache: ApolloCache, message: Message, chatId: string) => {
    const messages = cache.readQuery({ query: getMessagesDocument, variables: { chatId } });
    cache.writeQuery({
      query: getMessagesDocument,
      variables: { chatId },
      data: { messages: (messages?.messages || []).concat(message) }
    })
}