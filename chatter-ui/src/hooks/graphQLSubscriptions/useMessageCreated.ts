import { useSubscription } from "@apollo/client/react";
import { graphql } from "../../gql";
import { updateMessages } from "../../cache/messages";

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
  `)

export const useMessageCreated = (chatId: string) =>
  useSubscription(messageCreatedDocument, { variables: { chatId }, onData: ({ client, data }) => {
    if (data?.data?.messageCreated) {
      updateMessages(client.cache, data.data.messageCreated, chatId!);
    }
  } });