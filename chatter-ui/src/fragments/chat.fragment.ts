import { graphql } from "../gql";

export const chatFragmentWithLastMessage = graphql(`
    fragment ChatFragmentWithLastMessage on ChatDocumentWithLastMessage {
      _id
      createdBy
      isPrivate
      isGroup
      userIds
      name
      deleted
      createdAt
      lastMessage {
        ...MessageFragmentWithUser
      }
    }
  `)

export const chatFragment = graphql(`
    fragment ChatFragment on ChatDocument {
      _id
      createdBy
      isPrivate
      isGroup
      userIds
      name
      deleted
      createdAt
    }
  `)