import { graphql } from "../gql";

export const messageFragment = graphql(`
    fragment MessageFragment on Message {
      _id
      content
      createdAt
    }
  `)