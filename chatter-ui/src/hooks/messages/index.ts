import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";
import { MessagesQueryVariables } from "../../gql/graphql";
import { updateMessages } from "../../cache/messages";
import { updateLatestMessage } from "../../cache/latest-message";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragmentWithUser
    }
  }
  `)

const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update: (cache, { data }) => {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage, chatId!);
        updateLatestMessage(cache, data.createMessage);
      }
    }
  });
}

export const getMessagesDocument = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragmentWithUser
    }
  }
  `)

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables })
}

export { useCreateMessage, useGetMessages }