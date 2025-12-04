import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MUILink, TextField } from "@mui/material"
import useCreateUser from "../../hooks/useCreateUser"
import { useState } from "react"
import { extractErrorMessageFromGraphql } from "../../utils/errors"
import useLogin from "../../hooks/useLogin"

const Signup = () => {
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [createUser] = useCreateUser()
  const { login } = useLogin();
  const onSubmit = async (email: string, password: string) => {
    try {
      await createUser({ variables: { createUserInput: { email, password, username } } })
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
  return <Auth
  actionLabel="signup"
  onSubmit={onSubmit}
  error={error}
  extraFields={[
    <TextField
      label="Username"
      variant="outlined"
      type="text"
      placeholder="Username"
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  ]}
  >
    <Link to="/login" style={{ alignSelf: "center" }}>
      <MUILink>login</MUILink>
    </Link>
    </Auth>
}

export default Signup