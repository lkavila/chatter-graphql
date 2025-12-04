import { graphql } from "../gql";

export const chatFragmentWithLastMessage = graphql(`
    fragment chatFragmentWithLastMessage on ChatDocumentWithLastMessage {
      _id
      userId
      isPrivate
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
      userId
      isPrivate
      userIds
      name
      deleted
      createdAt
    }
  `)