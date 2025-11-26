import { makeVar } from "@apollo/client";

const currentChatVar = makeVar<string|null>(null);

export default currentChatVar