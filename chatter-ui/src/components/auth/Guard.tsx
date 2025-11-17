import { JSX, useEffect } from "react";
import useGetMe from "../../hooks/useGetMe"
import { GUARD_EXCLUDED_ROUTES } from "../../constants/guard-exluded-routes";
import authenticatedVar from "../../constants/authenticated";
import { snackVar } from "../../constants/snackbar";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";

interface GuardProps {
  children: JSX.Element;
}
const Guard: React.FC<GuardProps> = ({
  children
}) => {
  const { data, error } = useGetMe();
  useEffect(() => {
    if (data?.me) {
      authenticatedVar(true);
    }
  }, [data])

  useEffect(() => {
    if (error) {
      console.error(error);
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE)
    }
  }, [error])
  return (
    <>{
      GUARD_EXCLUDED_ROUTES.includes(window.location.pathname) ? children : data?.me && children
    }</>)
}

export default Guard