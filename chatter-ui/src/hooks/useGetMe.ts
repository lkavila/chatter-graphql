import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

const GET_ME = gql`
  query GetMe {
    me {
      _id
      email
    }
  }
` 

const useGetMe = () => {
  return useQuery<{
    me: {
      _id: string
      email: string
    }
  }>(GET_ME)
}

export default useGetMe