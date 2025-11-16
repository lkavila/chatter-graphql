import { JSX, useEffect } from "react";
import useGetMe from "../../hooks/useGetMe"
import { GUARD_EXCLUDED_ROUTES } from "../../constants/guard-exluded-routes";
import authenticatedVar from "../../constants/authenticated";

interface GuardProps {
  children: JSX.Element;
}
const Guard: React.FC<GuardProps> = ({
  children
}) => {
  const { data } = useGetMe();
  useEffect(() => {
    if (data?.me) {
      authenticatedVar(true);
    }
  }, [data])
  return (
    <>{
      GUARD_EXCLUDED_ROUTES.includes(window.location.pathname) ? children : data?.me && children
    }</>)
}

export default Guard