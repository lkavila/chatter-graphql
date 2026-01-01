import { useQuery } from "@apollo/client/react"
import { graphql } from "../../gql"

const getMeDocument = graphql(`
  query Me {
    me {
      _id
      email
      username
      profileUrl
    }
  }
`)

const useGetMe = () => {
  return useQuery(getMeDocument)
}

export default useGetMe