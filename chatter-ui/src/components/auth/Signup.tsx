import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"
import useCreateUser from "../../hooks/useCreateUser"

const Signup = () => {
  const [createUser] = useCreateUser()
  const onSubmit = async (email: string, password: string) => {
    const result = await createUser({ variables: { createUserInput: { email, password } } })
    console.log("result", result)
  }
  return <Auth actionLabel="signup" onSubmit={onSubmit}>
    <Link to="/login" style={{ alignSelf: "center" }}>
      <MUILink>login</MUILink>
    </Link>
    </Auth>
}

export default Signup