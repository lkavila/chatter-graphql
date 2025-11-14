import { Link } from "react-router-dom"
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"

const Login = () => {

  return <Auth actionLabel="login" onSubmit={async () => {}}>
    <Link to="/signup" style={{ alignSelf: "center" }}>
      <MUILink>signup</MUILink>
    </Link>
  </Auth>
}

export default Login