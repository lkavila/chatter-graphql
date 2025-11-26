import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/chats";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import currentChatVar from "../../../constants/currentChat";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}
const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [createChat] = useCreateChat();

  const handleSave = async () => {
    try {
      if (!name) {
        setError("Name is required");
        return;
      }
      setIsSaving(true);
      const { data } = await createChat({ variables: { createChatInput: { name: name?.trim() || undefined, isPrivate } } });
      setIsSaving(false);
      currentChatVar(data?.createChat._id)
      onClose();
    } catch (error) {
      setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  const onClose = () => {
    setIsPrivate(false);
    setName("");
    setError("");
    handleClose()
  }

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Chat
          </Typography>
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked={isPrivate}
                  value={isPrivate}
                  onChange={(event) => setIsPrivate(event.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper
              sx={{
                mt: 2,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField
              label="Name"
              error={!!error}
              helperText={error}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => handleSave()}
            loading={isSaving}
            loadingPosition="end"
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
