import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";
import { chatFragmentWithLastMessage } from "../../fragments/chat.fragment";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...chatFragmentWithLastMessage
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
              fragment: chatFragmentWithLastMessage
            });
            return [newChatRef, ...existingChats];
          },
        },
      })
    }
  });
}

export const getChatsDocument = graphql(`
  query GetChats {
    chats {
      ...chatFragmentWithLastMessage
    }
  }
  `)

const useGetChats = () => {
  return useQuery(getChatsDocument)
}

export const getChatDocument = graphql(`
  query GetChat($_id: String) {
    chat(_id: $_id) {
      ...chatFragmentWithLastMessage
    }
  }
  `)

const useGetChat = (_id?: string | null) => {
  return useQuery(getChatDocument, { variables: { _id: _id || null } })
}


export { useCreateChat, useGetChats, useGetChat }
