import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  useCreateMessage,
  useGetChat,
  useGetMessages,
} from "../../hooks/chats";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import currentChatVar from "../../constants/currentChat";

interface ChatProps {
  chatId: string;
  isMobile?: boolean;
}
const ChatComponent = ({ chatId, isMobile }: ChatProps) => {
  const [message, setMessage] = useState("");
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const hanldeOnSendMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: message,
          chatId: chatId!,
        },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  const { data } = useGetChat(chatId);
  return (
    <Stack sx={{ height: "100%", padding: "10px" }}>
      <Box
        sx={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "10px",
        }}
      >
        {isMobile ? (
          <ArrowBackIcon
            sx={{ marginRight: "0.5rem", cursor: "pointer" }}
            onClick={() => currentChatVar(null)}
          />
        ) : (
          ""
        )}
        <Typography variant="subtitle1">{data?.chat?.name}</Typography>
      </Box>
      <Box sx={{ overflow: "auto", maxHeight: "82vh" }}>
        {messages?.messages?.map((message) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid size={1}>
              <Avatar src="" sx={{ width: 50, height: 50 }} />
            </Grid>
            <Grid size={11}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.5rem" }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifySelf: "flex-end",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Write something"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              hanldeOnSendMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={() => hanldeOnSendMessage()}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default ChatComponent;
