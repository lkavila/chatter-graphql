import { graphql } from "../gql";

export const messageFragmentWithUser = graphql(`
    fragment MessageFragmentWithUser on LastMessage {
      _id
      content
      createdAt
      updatedAt
      deleted
      chat
      user {
        _id
        username
      }
    }
  `)