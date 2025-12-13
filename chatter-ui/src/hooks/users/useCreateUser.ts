import { useMutation } from "@apollo/client/react";
import { graphql } from "../../gql";

const CreateUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      username
    }
  }
`)
const useCreateUser = () => {
  return useMutation(CreateUserDocument)
}

export default useCreateUser