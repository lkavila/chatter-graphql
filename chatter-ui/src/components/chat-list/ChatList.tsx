import List from "@mui/material/List";
import ChitListItem from "./chat-list-item";
import ForumIcon from "@mui/icons-material/Forum";
import { Container, Divider, Grid, Stack, useMediaQuery } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./chat-list-add";
import { useGetChats } from "../../hooks/chats";
import Chat from "../chat";
import { useReactiveVar } from "@apollo/client/react";
import currentChatVar from "../../constants/currentChat";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const currentChat = useReactiveVar(currentChatVar);
  const { data } = useGetChats();
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <Grid container sx={{ height: "94vh" }}>
      <Grid
        size={isMobile ? 12 : 4}
        sx={{ display: isMobile && currentChat ? "none" : "block" }}
      >
        <ChatListAdd
          open={chatListAddVisible}
          handleClose={() => setChatListAddVisible(false)}
        />
        <Stack>
          <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
          <Divider />
          <List
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "360px",
              bgcolor: "background.paper",
              maxHeight: "85vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px", // Ancho de la barra
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#a1a1a1", // Color del "pulgar" de la barra
                borderRadius: "8px", // Bordes redondeados
              },
            }}
          >
            {data?.chats.map((chat) => (
              <ChitListItem
                key={chat._id}
                chat={chat}
                onClick={() => currentChatVar(chat && { _id: chat._id, name: chat.name || "" })}
                selected={chat._id === currentChat?._id}
              />
            ))}
          </List>
        </Stack>
      </Grid>
      <Grid
        size={isMobile ? 12 : 8}
        sx={{ display: isMobile && !currentChat ? "none" : "block" }}
      >
        {currentChat ? (
          <Chat chat={currentChat} isMobile={isMobile} />
        ) : (
          <Container
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Stack>
              <ForumIcon sx={{ fontSize: "100px" }} />
              <h2>Select a chat to start conversation</h2>
            </Stack>
          </Container>
        )}
      </Grid>
    </Grid>
  );
};

export default ChatList;
