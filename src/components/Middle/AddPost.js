import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNewPost } from "../../hooks/PostHooks/useNewPost";
import {
  ArrowBack,
  Clear,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
  ButtonGroup,
  Button,
  Fab,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

export const AddPost = () => {
  const [open, setOpen] = React.useState(false);

  const [selectedFiles, setSelectedFiles] = React.useState();
  const [preview, setPreview] = React.useState();

  const [error, setError] = React.useState(false);

  const userID = useSelector((state) => state.auth.currentUserID);

  // For Handling Image Section --- Start
  const onImageChangeHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFiles(undefined);
      return;
    }
    setSelectedFiles(event.target.files[0]);
  };

  const onImageDeleteHandler = () => {
    setSelectedFiles();
    setPreview();
  };

  React.useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(selectedFiles);
    setPreview(objectURL);
  }, [selectedFiles]);

  // For Handling Image Section --- End

  const { newPostData, newPostLoading, newPostError, sendNewPostData } =
    useNewPost();

  React.useEffect(() => {
    setOpen(false);
  }, [newPostData]);

  React.useEffect(() => {
    newPostError && setError(true);
  }, [newPostError]);

  const onPostSubmitHandler = (event) => {
    event.preventDefault();

    const content = event.target.post.value;

    if (content.length === 0) {
      setError(true);
    } else if (!selectedFiles) {
      sendNewPostData({ content });

      setError(false);
      setSelectedFiles();
      setPreview();
    } else {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("imagefield", selectedFiles);

      sendNewPostData(formData);

      setError(false);
      setSelectedFiles();
      setPreview();
    }
  };

  // Getting Current User Data
  const profileData = useSelector((state) => state.auth.currentUserData);

  return (
    <Card>
      {/* Link to activate post modal */}
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        py={1}
      >
        <IconButton component={RouterLink} to={`/profile/${userID}`}>
          <Avatar
            alt={profileData && profileData.first_name}
            sx={{ height: { xs: 30, md: 60 }, width: { xs: 30, md: 60 } }}
            src={profileData && profileData.imagefield}
          >
            {profileData && profileData.first_name[0]}
          </Avatar>
        </IconButton>
        <Card
          elevation={0}
          onClick={() => setOpen(true)}
          variant="outlined"
          sx={{
            flexGrow: 4,
            height: { xs: "2rem", md: "3rem" },
            "&:hover": {
              cursor: "text",
            },
            display: "flex",
            alignItems: "center",
            px: "1rem",
          }}
        >
          <Typography variant="p">
            What's on your mind,{" "}
            {profileData && profileData.first_name.slice(0, 15)}?
          </Typography>
        </Card>
        <Stack direction={"row"} onClick={() => setOpen(true)}>
          <IconButton
            variant="text"
            color="primary"
            sx={{ display: { xs: "none", md: "inherit" } }}
            disabled
          >
            <EmojiEmotions />
          </IconButton>
          <IconButton variant="text" color="secondary">
            <Image />
          </IconButton>
          <IconButton
            variant="text"
            color="success"
            sx={{ display: { xs: "none", md: "inherit" } }}
            disabled
          >
            <VideoCameraBack />
          </IconButton>
          <IconButton
            variant="text"
            color="error"
            sx={{ display: { xs: "none", md: "inherit" } }}
            disabled
          >
            <PersonAdd />
          </IconButton>
        </Stack>
      </Stack>

      {/* Modal Form to submit post */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setError(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent="space-between">
            <Box></Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="grey"
              textAlign={"center"}
            >
              Create a Post
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={() => {
                setOpen(false);
                setError(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
          <UserBox>
            <Avatar
              alt={profileData && profileData.first_name}
              src={profileData && profileData.imagefield}
              sx={{ width: 40, height: 40 }}
            >
              {profileData && profileData.first_name[0]}
            </Avatar>
            <Typography fontWeight={500} variant="span" color="grey">
              {profileData &&
                profileData.first_name + " " + profileData.last_name}
            </Typography>
          </UserBox>
          <Box
            sx={{ position: "relative" }}
            component="form"
            noValidate
            onSubmit={onPostSubmitHandler}
          >
            <Box>
              {selectedFiles && (
                <Box
                  component="img"
                  sx={{
                    width: 200,
                  }}
                  src={preview}
                />
              )}
              {selectedFiles && (
                <Fab
                  aria-label="delete"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "-15px",
                    left: "185px",
                    zIndex: 999,
                  }}
                  onClick={onImageDeleteHandler}
                >
                  <Clear />
                </Fab>
              )}
            </Box>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={4}
              autoFocus
              placeholder={`What's on your mind, ${
                profileData && profileData.first_name.slice(0, 15)
              }?`}
              name="post"
              variant="standard"
              error={error}
            />
            <Box>
              <IconButton variant="text" color="primary" disabled>
                <EmojiEmotions />
              </IconButton>
              <IconButton variant="text" color="secondary" component="label">
                <Image />
                <input
                  accept="image/"
                  name="image"
                  type="file"
                  onChange={onImageChangeHandler}
                  multiple
                  hidden
                />
              </IconButton>
              <IconButton variant="text" color="success" disabled>
                <VideoCameraBack />
              </IconButton>
              <IconButton variant="text" color="error" disabled>
                <PersonAdd />
              </IconButton>
            </Box>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              {!newPostLoading && <Button type="submit">Post</Button>}
              {newPostLoading && (
                <LoadingButton loading loadingPosition="center">
                  Post
                </LoadingButton>
              )}
              <Button sx={{ width: "100px" }} disabled>
                <DateRange />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};
