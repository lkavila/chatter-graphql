import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface AuthProps {
  actionLabel: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
  children?: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({
  actionLabel,
  onSubmit,
  children
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <Stack spacing={3} sx={{ height: "100vh", maxWidth: {
    xs: "70%",
    sm: "50%",
    md: "30%"
  }, margin: "0 auto", justifyContent: "center"}}>
    <TextField
      label="Email"
      variant="outlined"
      type="email"
      placeholder="Email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      label="Passwod"
      variant="outlined"
      type="password"
      placeholder="Passwod"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button variant="contained" onClick={() => onSubmit(email, password)}>{actionLabel}</Button>
    {children}
  </Stack>;
};

export default Auth;
