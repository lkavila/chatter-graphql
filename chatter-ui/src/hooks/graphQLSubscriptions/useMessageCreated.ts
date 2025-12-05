import { useSubscription } from "@apollo/client/react";
import { graphql } from "../../gql";
import { updateMessages } from "../../cache/messages";
import { updateLatestMessage } from "../../cache/latest-message";
import { SubscriptionMessageCreatedArgs } from "../../gql/graphql";

const messageCreatedDocument = graphql(`
  subscription MessageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragmentWithUser
    }
  }
  `)

export const useMessageCreated = (variables: SubscriptionMessageCreatedArgs) =>
  useSubscription(messageCreatedDocument, { variables, onData: ({ client, data }) => {
    if (data?.data?.messageCreated) {
      updateMessages(client.cache, data.data.messageCreated);
      updateLatestMessage(client.cache, data.data.messageCreated);
    }
  } });