import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { onLogout } from "../../utils/logout";
import useLogout from "../../hooks/auth/useLogout";
import { snackVar } from "../../constants/snackbar";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";

const Settings = () => {
  const { logout } = useLogout();
  const onUserLogout = async () => {
    try {
      handleCloseUserMenu();
      await logout();
      onLogout();
    } catch (error) {
      console.log(error);
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }
  const settings = [
    { id: 1, name: "Profile", onClick: () => { handleCloseUserMenu() } },
    { id: 2, name: "Logout", onClick: onUserLogout }];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ name, onClick, id }) => (
          <MenuItem key={name} onClick={onClick}>
            <Typography sx={{ textAlign: "center" }}>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Settings;
