import { graphql } from "../gql";

export const searchUsersFragment = graphql(`
    fragment SearchUsersFragment on SearchUser {
      _id
      username
      email
      isOnline
      lastConnection
    }
  `)