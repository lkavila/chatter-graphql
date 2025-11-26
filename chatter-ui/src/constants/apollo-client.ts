import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { GUARD_EXCLUDED_ROUTES } from "./guard-exluded-routes";
import { onLogout } from "../utils/logout";
import { snackVar } from "./snackbar";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "./errors";

const logoutLink = new ErrorLink(({ result, error }) => {
  console.log("error", result?.errors?.[0]?.extensions?.originalError);
  if (result && (result?.errors?.[0]?.extensions?.originalError as { statusCode?: number })?.statusCode === 401) {
    if (!GUARD_EXCLUDED_ROUTES.includes(window.location.pathname)) {
      onLogout();
    }
  } else if (result && error) {
    console.log("errorerror", error)
    snackVar(UNKNOWN_ERROR_SNACK_MESSAGE)
  }
})

const serverLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(serverLink),
})

export default client
