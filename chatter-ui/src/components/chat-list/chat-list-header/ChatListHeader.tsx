import AddCircle from "@mui/icons-material/AddCircle";
import { AppBar, Toolbar, IconButton } from "@mui/material";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}
const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  const handleOnClick = () => {
    console.log("handleAddChat")
    handleAddChat();
  }
 
  return (
    <AppBar position="static" sx={{ height: "48px", maxWidth: 360, width: "100%"}} color="transparent">
      <Toolbar>
        <IconButton size="large" onClick={() => handleOnClick()}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
};

export default ChatListHeader