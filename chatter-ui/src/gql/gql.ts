/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment chatFragmentWithLastMessage on ChatDocumentWithLastMessage {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n      lastMessage {\n        ...MessageFragmentWithUser\n      }\n    }\n  ": typeof types.ChatFragmentWithLastMessageFragmentDoc,
    "\n    fragment ChatFragment on ChatDocument {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n    }\n  ": typeof types.ChatFragmentFragmentDoc,
    "\n    fragment MessageFragmentWithUser on LastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n      deleted\n      chat\n      user {\n        _id\n        username\n      }\n    }\n  ": typeof types.MessageFragmentWithUserFragmentDoc,
    "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": typeof types.CreateChatDocument,
    "\n  query GetChats {\n    chats {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": typeof types.GetChatsDocument,
    "\n  query GetChat($_id: String) {\n    chat(_id: $_id) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": typeof types.GetChatDocument,
    "\n  subscription MessageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": typeof types.MessageCreatedDocument,
    "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": typeof types.CreateMessageDocument,
    "\n  query Messages($chatId: String!) {\n    messages(chatId: $chatId) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": typeof types.MessagesDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      username\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query GetMe {\n    me {\n      _id\n      email\n    }\n  }\n": typeof types.GetMeDocument,
};
const documents: Documents = {
    "\n    fragment chatFragmentWithLastMessage on ChatDocumentWithLastMessage {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n      lastMessage {\n        ...MessageFragmentWithUser\n      }\n    }\n  ": types.ChatFragmentWithLastMessageFragmentDoc,
    "\n    fragment ChatFragment on ChatDocument {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n    }\n  ": types.ChatFragmentFragmentDoc,
    "\n    fragment MessageFragmentWithUser on LastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n      deleted\n      chat\n      user {\n        _id\n        username\n      }\n    }\n  ": types.MessageFragmentWithUserFragmentDoc,
    "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": types.CreateChatDocument,
    "\n  query GetChats {\n    chats {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": types.GetChatsDocument,
    "\n  query GetChat($_id: String) {\n    chat(_id: $_id) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  ": types.GetChatDocument,
    "\n  subscription MessageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": types.MessageCreatedDocument,
    "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": types.CreateMessageDocument,
    "\n  query Messages($chatId: String!) {\n    messages(chatId: $chatId) {\n      ...MessageFragmentWithUser\n    }\n  }\n  ": types.MessagesDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      username\n    }\n  }\n": types.CreateUserDocument,
    "\n  query GetMe {\n    me {\n      _id\n      email\n    }\n  }\n": types.GetMeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment chatFragmentWithLastMessage on ChatDocumentWithLastMessage {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n      lastMessage {\n        ...MessageFragmentWithUser\n      }\n    }\n  "): (typeof documents)["\n    fragment chatFragmentWithLastMessage on ChatDocumentWithLastMessage {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n      lastMessage {\n        ...MessageFragmentWithUser\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ChatFragment on ChatDocument {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n    }\n  "): (typeof documents)["\n    fragment ChatFragment on ChatDocument {\n      _id\n      userId\n      isPrivate\n      userIds\n      name\n      deleted\n      createdAt\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment MessageFragmentWithUser on LastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n      deleted\n      chat\n      user {\n        _id\n        username\n      }\n    }\n  "): (typeof documents)["\n    fragment MessageFragmentWithUser on LastMessage {\n      _id\n      content\n      createdAt\n      updatedAt\n      deleted\n      chat\n      user {\n        _id\n        username\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "): (typeof documents)["\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChats {\n    chats {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "): (typeof documents)["\n  query GetChats {\n    chats {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChat($_id: String) {\n    chat(_id: $_id) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "): (typeof documents)["\n  query GetChat($_id: String) {\n    chat(_id: $_id) {\n      ...chatFragmentWithLastMessage\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MessageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "): (typeof documents)["\n  subscription MessageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "): (typeof documents)["\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Messages($chatId: String!) {\n    messages(chatId: $chatId) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "): (typeof documents)["\n  query Messages($chatId: String!) {\n    messages(chatId: $chatId) {\n      ...MessageFragmentWithUser\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMe {\n    me {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      _id\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;