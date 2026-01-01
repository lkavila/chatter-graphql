import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import useGetMe from "../../hooks/auth/useGetMe";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snackbar";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        if (res.status >= 400) {
          console.log("res", res)
          // show error message from body
          const data = await res.json();
          throw new Error(data.message);
        }
        throw new Error("Image upload failed.");
      }
      snackVar({ message: "Image uploaded.", type: "success" });
    } catch (err) {
      snackVar({ message: (err as any).message || "Error uploading file.", type: "error" });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">{me?.data?.me.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} src={me?.data?.me.profileUrl || ""} />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;