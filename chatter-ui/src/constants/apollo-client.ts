import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { GUARD_EXCLUDED_ROUTES } from "./guard-exluded-routes";
import router from "../components/Routes";

const logoutLink = new ErrorLink((error) => {
  console.log("error", error?.result?.errors?.[0]?.extensions?.originalError);
  if (error.result && (error?.result?.errors?.[0]?.extensions?.originalError as { statusCode?: number })?.statusCode === 401) {
    if (!GUARD_EXCLUDED_ROUTES.includes(window.location.pathname)) {
      router.navigate("/login");
      client.resetStore();
    }
  }
})

const serverLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(serverLink),
})

export default client
