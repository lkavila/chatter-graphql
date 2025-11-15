const extractErrorMessageFromGraphql = (error: any) => {
  let messageObject
  if (error.graphQLErrors) {
    messageObject = error.graphQLErrors[0]?.extensions?.originalError?.message;
  }
  if (error.errors) {
    messageObject = error.errors[0]?.extensions?.originalError?.message;
  }
    if (error.CombinedGraphQLErrors) {
    messageObject = error.CombinedGraphQLErrors[0]?.extensions?.originalError?.message;
  }
  if (Array.isArray(messageObject)) {
    messageObject = messageObject[0];
  }
  return formatErrorMessage(messageObject)
};

const formatErrorMessage = (message: string | undefined) => {
  if (!message) return 'Unknown error';
  return message[0].toUpperCase() + message.slice(1);
};

export { extractErrorMessageFromGraphql };