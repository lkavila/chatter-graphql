import { LOGOUT_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${LOGOUT_URL}`, { method: "POST" });
    if (!res.ok) {
      throw new Error("Failed to logout");
    }
  }
  return { logout };
}

export default useLogout