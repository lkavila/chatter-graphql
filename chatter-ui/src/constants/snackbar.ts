import { makeVar } from "@apollo/client";
import { SnackMessage } from "../interfaces/snack-messages.interface";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
