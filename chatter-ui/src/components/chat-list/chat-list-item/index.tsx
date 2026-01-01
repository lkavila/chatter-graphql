import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Divider, ListItemButton } from "@mui/material";
import { ChatDocumentWithLastMessage } from "../../../gql/graphql";

interface ChitListItemProps {
  chat?: ChatDocumentWithLastMessage,
  onClick: () => void,
  selected: boolean
}
const ChitListItem = ({ chat, onClick, selected }: ChitListItemProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={() => onClick()} selected={selected}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={chat?.lastMessage?.user?.profileUrl || ""} />
          </ListItemAvatar>
          <ListItemText
            primary={chat?.name}
            secondary={
              <Box component="span" sx={{ display: "flex" }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {chat?.lastMessage?.user?.username}
                </Typography>
                { chat?.lastMessage &&
                <div style={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  lineClamp: 1,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {`: ${chat?.lastMessage?.content}`}
                </div>
                }
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChitListItem;
