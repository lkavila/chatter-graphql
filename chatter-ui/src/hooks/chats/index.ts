import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";
import { chatFragmentWithLastMessage } from "../../fragments/chat.fragment";
import { useCallback, useState } from "react";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snackbar";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { QueryChatsArgs } from "../../gql/graphql";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragmentWithLastMessage
    }
  }
  `)

const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          chats: (existingChats = []) => {
            const newChatRef = cache.writeFragment({
          data: data?.createChat,
          fragment: chatFragmentWithLastMessage,
          fragmentName: "ChatFragmentWithLastMessage", // solo si hay más de 1 fragment
        });
            return [newChatRef, ...existingChats];
          },
        },
      })
    }
  });
}

export const getChatsDocument = graphql(`
  query GetChats($skip: Int, $limit: Int) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragmentWithLastMessage
    }
  }
  `)

const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(getChatsDocument, { variables })
}

export const getChatDocument = graphql(`
  query GetChat($_id: String) {
    chat(_id: $_id) {
      ...ChatFragmentWithLastMessage
    }
  }
  `)

const useGetChat = (_id?: string | null) => {
  return useQuery(getChatDocument, { variables: { _id: _id || null } })
}

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState(0);

  const countChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/chats/count`, { method: "GET" });
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return
    }
    const data = await res.text();
    setChatsCount(parseInt(data));
  }, []);

  return { chatsCount, countChats }
  }


export { useCreateChat, useGetChats, useGetChat, useCountChats }
