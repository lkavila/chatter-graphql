import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useGetMe from "../../hooks/auth/useGetMe";
import { useNavigate } from "react-router-dom";
import { screenVHeight } from "../../constants/constants";

interface AuthProps {
  actionLabel: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
  children?: React.ReactNode,
  extraFields?: React.ReactNode[],
  error?: string
}

const Auth: React.FC<AuthProps> = ({
  actionLabel,
  onSubmit,
  children,
  extraFields,
  error
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.me) {
      navigate("/");
    }
  }, [data, navigate])

  return <Stack spacing={3} sx={{ height: `${screenVHeight}vh`, maxWidth: {
    xs: "60%",
    sm: "40%",
    md: "25%"
  }, margin: "0 auto", justifyContent: "center"}}>
    <TextField
      label="Email"
      variant="outlined"
      type="email"
      placeholder="Email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={!!error}
      helperText={error}
    />
    {extraFields}
    <TextField
      label="Passwod"
      variant="outlined"
      type="password"
      placeholder="Passwod"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      error={!!error}
      helperText={error}
    />
    <Button variant="contained" onClick={() => onSubmit(email, password)}>{actionLabel}</Button>
    {children}
  </Stack>;
};

export default Auth;
