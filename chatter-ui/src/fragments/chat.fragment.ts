import { graphql } from "../gql";

export const chatFragment = graphql(`
    fragment ChatFragment on Chat {
      _id
      userId,
      isPrivate
      userIds
      name
    }
  `)