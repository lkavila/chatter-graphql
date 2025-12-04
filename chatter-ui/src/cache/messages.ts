import { ApolloCache } from "@apollo/client";
import { LastMessage } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/messages";

export const updateMessages = (cache: ApolloCache, message: LastMessage, chatId: string) => {
    const messages = cache.readQuery({ query: getMessagesDocument, variables: { chatId } });
    cache.writeQuery({
      query: getMessagesDocument,
      variables: { chatId },
      data: { messages: (messages?.messages || []).concat(message) }
    })
}