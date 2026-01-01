import { graphql } from "../gql";

export const searchUsersFragment = graphql(`
    fragment SearchUsersFragment on SearchUser {
      _id
      username
      email
      isOnline
      lastConnection
      profileUrl
    }
  `)

export const MeFragment = graphql(`
    fragment MeFragment on User {
      _id
      email
      username
      profileUrl
    }
  `)