import { LOGOUT_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    await fetch(`${LOGOUT_URL}`, { method: "POST" });
  }
  return { logout };
}

export default useLogout