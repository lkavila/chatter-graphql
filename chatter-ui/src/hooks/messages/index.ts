import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";
import { MessagesQueryVariables } from "../../gql/graphql";
import { updateMessages } from "../../cache/messages";
import { updateLatestMessage } from "../../cache/latest-message";
import { useCallback, useState } from "react";
import { API_URL } from "../../constants/urls";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { snackVar } from "../../constants/snackbar";

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
        updateMessages(cache, data.createMessage);
        updateLatestMessage(cache, data.createMessage);
      }
    }
  });
}

export const getMessagesDocument = graphql(`
  query Messages($chatId: String!, $skip: Int, $limit: Int) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      ...MessageFragmentWithUser
    }
  }
  `)

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables })
}

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState(0);

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`, { method: "GET" });
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return
    }
    const data = await res.json();

    setMessagesCount(parseInt(data.count));
  }, [chatId]);

  return { messagesCount, countMessages }
  }

export { useCreateMessage, useGetMessages, useCountMessages }