import { makeVar } from "@apollo/client";
import { ICurrentChat } from "../interfaces/chat.interfaces";

const currentChatVar = makeVar<ICurrentChat|null>(null);

export default currentChatVar