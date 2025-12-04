import { useSubscription } from "@apollo/client/react";
import { graphql } from "../../gql";
import { updateMessages } from "../../cache/messages";
import { updateLatestMessage } from "../../cache/latest-message";

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragmentWithUser
    }
  }
  `)

export const useMessageCreated = (chatId: string) =>
  useSubscription(messageCreatedDocument, { variables: { chatId }, onData: ({ client, data }) => {
    if (data?.data?.messageCreated) {
      updateMessages(client.cache, data.data.messageCreated, chatId!);
      updateLatestMessage(client.cache, data.data.messageCreated);
    }
  } });