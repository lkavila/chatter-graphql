import { useQuery } from "@apollo/client/react";
import { graphql } from "../../gql";

export const searchUsersDocument = graphql(`
  query SearchUsers($search: String) {
    searchUsers(search: $search) {
      ...SearchUsersFragment
    }
  }
  `)

export const useSearchUsers = (search: string) => {
  return useQuery(searchUsersDocument, { variables: { search } })
}