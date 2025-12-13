import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/chats";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import currentChatVar from "../../../constants/currentChat";
import UsersAutocomplete from "../../autocomplete/usersAutocomplete";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}
const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [usersIds, setUsersIds] = useState<string[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  const [createChat] = useCreateChat();

  const handleSave = async () => {
    try {
      if ((isGroup || !isPrivate) && !name) {
        setError("Name is required");
        return;
      }
      setIsSaving(true);
      const { data } = await createChat({ variables: { createChatInput: {
        name: name?.trim() || undefined,
        isPrivate,
        userIds: isPrivate ? usersIds : undefined,
        isGroup: isPrivate && isGroup
      } } });

      setIsSaving(false);
      currentChatVar({
        _id: data?.createChat._id as string,
        name: data?.createChat.name || "",
      })
      onClose();
    } catch (error) {
      console.error("error", error)
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
          width: 600,
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
          <Stack direction="row" spacing={20}>
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
            { isPrivate &&
            <FormGroup>
              <FormControlLabel
                style={{ width: 0 }}
                control={
                  <Switch
                    defaultChecked={isGroup}
                    value={isGroup}
                    onChange={(event) => setIsGroup(event.target.checked)}
                  />
                }
                label="Group"
              />
            </FormGroup>
            }
          </Stack>
          {(isGroup || !isPrivate) && (
            <Paper
              sx={{
                mt: 2,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label="Chat Name"
                sx={{ width: '100%' }}
                error={!!error}
                helperText={error}
                onChange={(e) => setName(e.target.value)}
              />
            </Paper>
          )}
          {isPrivate && (
            <Paper
              sx={{
                mt: 2,
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UsersAutocomplete onSelect={setUsersIds} multiple={isGroup} />
            </Paper>
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
