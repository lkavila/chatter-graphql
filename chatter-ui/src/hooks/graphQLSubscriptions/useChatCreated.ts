import { useSubscription } from "@apollo/client/react";
import { graphql } from "../../gql";
import { updateLatestChats } from "../../cache/chats";

const chatCreatedDocument = graphql(`
  subscription ChatCreated {
    chatCreated {
      ...ChatFragmentWithLastMessage
    }
  }
  `)

export const useChatCreated = () =>
  useSubscription(chatCreatedDocument, { onData: ({ client, data }) => {
    if (data?.data?.chatCreated) {
      updateLatestChats(client.cache, data.data.chatCreated);
    }
  } });