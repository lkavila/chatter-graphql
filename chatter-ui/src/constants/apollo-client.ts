import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { GUARD_EXCLUDED_ROUTES } from "./guard-exluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = new ErrorLink(({ result, error }) => {
  console.log("error", result?.errors?.[0]?.extensions?.originalError);
  if (result && (result?.errors?.[0]?.extensions?.originalError as { statusCode?: number })?.statusCode === 401) {
    if (!GUARD_EXCLUDED_ROUTES.includes(window.location.pathname)) {
      onLogout();
    }
  }
  if (error) console.error("error", error);
})

const serverLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(serverLink),
})

export default client
