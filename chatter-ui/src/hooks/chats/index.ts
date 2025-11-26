import { useMutation, useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";
import { chatFragment } from "../../fragments/chat.fragment";
import { MessagesQueryVariables } from "../../gql/graphql";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
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
              fragment: chatFragment
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
      ...ChatFragment
    }
  }
  `)

const useGetChats = () => {
  return useQuery(getChatsDocument)
}

export const getChatDocument = graphql(`
  query GetChat($_id: String) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
  `)

const useGetChat = (_id?: string | null) => {
  return useQuery(getChatDocument, { variables: { _id: _id || null } })
}

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
  `)

const useCreateMessage = (chatId?: string | null) => {
  return useMutation(createMessageDocument, {
    update: (cache, { data }) => {
      const messages = cache.readQuery({ query: getMessagesDocument, variables: { chatId } });
      if (!messages || !data || !chatId) return;
      cache.writeQuery({
        query: getMessagesDocument,
        variables: { chatId },
        data: { messages: (messages.messages || []).concat(data?.createMessage) }
      })
    }
  });
}

const getMessagesDocument = graphql(`
  query Messages($chatId: String) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
  `)

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables })
}

export { useCreateChat, useGetChats, useGetChat, useCreateMessage, useGetMessages }
