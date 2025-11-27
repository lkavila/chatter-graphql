import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import { GUARD_EXCLUDED_ROUTES } from "./guard-exluded-routes";
import { onLogout } from "../utils/logout";
import { snackVar } from "./snackbar";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "./errors";
import { createClient } from "graphql-ws";
import { OperationTypeNode } from "graphql";

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
const wsServerLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsServerLink,
  serverLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
})

export default client
