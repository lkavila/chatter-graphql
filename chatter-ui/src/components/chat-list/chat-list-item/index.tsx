import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider, ListItemButton } from "@mui/material";
import { Chat } from "../../../gql/graphql";

interface ChitListItemProps {
  chat?: Chat,
  onClick: () => void,
  selected: boolean
}
const ChitListItem = ({ chat, onClick, selected }: ChitListItemProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={() => onClick()} selected={selected}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat?.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChitListItem;
