import { useQuery } from "@apollo/client/react"
import { graphql } from "../gql"

const getMeDocument = graphql(`
  query GetMe {
    me {
      _id
      email
    }
  }
`)

const useGetMe = () => {
  return useQuery(getMeDocument)
}

export default useGetMe