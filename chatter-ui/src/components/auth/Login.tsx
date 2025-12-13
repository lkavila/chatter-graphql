import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"
import useLogin from "../../hooks/auth/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  return <Auth actionLabel="login" onSubmit={(email, password) => login({ email, password })} error={error}>
    <Link to="/signup" style={{ alignSelf: "center" }}>
      <MUILink>signup</MUILink>
    </Link>
  </Auth>
}

export default Login