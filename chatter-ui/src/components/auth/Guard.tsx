import { JSX } from "react";
import useGetMe from "../../hooks/useGetMe"
import { GUARD_EXCLUDED_ROUTES } from "../../constants/guard-exluded-routes";

interface GuardProps {
  children: JSX.Element;
}
const Guard: React.FC<GuardProps> = ({
  children
}) => {
  const { data } = useGetMe();
  console.log("data", data);
  return (
    <>{
      GUARD_EXCLUDED_ROUTES.includes(window.location.pathname) ? children : data?.me && children
    }</>)
}

export default Guard