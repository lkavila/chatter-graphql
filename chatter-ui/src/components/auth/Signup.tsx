import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"
import useCreateUser from "../../hooks/useCreateUser"
import { useState } from "react"
import { extractErrorMessageFromGraphql } from "../../utils/errors"
import useLogin from "../../hooks/useLogin"

const Signup = () => {
  const [error, setError] = useState<string>();
  const [createUser] = useCreateUser()
  const { login } = useLogin();
  const onSubmit = async (email: string, password: string) => {
    try {
      await createUser({ variables: { createUserInput: { email, password } } })
      setError("");
      await login({ email, password });
    } catch (error) {
      const errorMessage = extractErrorMessageFromGraphql(error);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Something went wrong");
      }
    }
    
  }
  return <Auth actionLabel="signup" onSubmit={onSubmit} error={error}>
    <Link to="/login" style={{ alignSelf: "center" }}>
      <MUILink>login</MUILink>
    </Link>
    </Auth>
}

export default Signup