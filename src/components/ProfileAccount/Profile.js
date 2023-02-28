import React from "react";
import { LeftSidebar } from "../Leftside/LeftSidebar";
import { AddPost } from "../Middle/AddPost";
import RecentActivities from "../Rightside/RecentActivities";
import { useSelector } from "react-redux";
import { Post } from "../Middle/Post";
import moment from "moment";

import {
  AccessTime,
  AddAPhoto,
  Cake,
  Cancel,
  Download,
  Edit,
  Image,
  Upload,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Fab,
  FormControlLabel,
  Grid,
  Link,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: { xs: "47%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: "90vw" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  paddingBottom: 6,
};

// Update Password Modal
function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  const [oldPasswordError, setOldPasswordError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onPasswordSubmitHandler = (event) => {
    event.preventDefault();

    const current_password = event.target.oldpassword.value;
    const new_password = event.target.password1.value;
    const re_new_password = event.target.password2.value;

    if (
      current_password.length > 7 &&
      new_password > 7 &&
      re_new_password > 7 &&
      new_password === re_new_password
    ) {
      console.log(current_password, new_password, re_new_password);
    } else if (re_new_password !== new_password) {
      setOldPasswordError(false);
      setPasswordError(true);
      setConfirmPasswordError(true);
    } else {
      setOldPasswordError(true);
      setPasswordError(true);
      setConfirmPasswordError(true);
    }
  };

  return (
    <React.Fragment>
      <Link onClick={handleOpen} sx={{ "&:hover": { cursor: "pointer" } }}>
        Update Password
      </Link>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: { xs: "98vw", md: "50vw" } }}>
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="text.secondary"
            >
              Update Password
            </Typography>
            <Box></Box>
          </Stack>
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={onPasswordSubmitHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="oldpassword"
                    label="Old Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={oldPasswordError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    error={confirmPasswordError}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// Update Email Modal
function ChangeEmail() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onEmailSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    if (email.includes("@")) {
      setError(false);
      console.log(email);
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <Link onClick={handleOpen} sx={{ "&:hover": { cursor: "pointer" } }}>
        Update Email
      </Link>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: { xs: "98vw", md: "50vw" } }}>
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="text.secondary"
            >
              Update Email Address
            </Typography>
            <Box></Box>
          </Stack>
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={onEmailSubmitHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Please check this box if the above email address is correct."
                    name="emailvalid"
                    color="text.secondary"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Email Reset Link
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export const Profile = ({ profileData, loading, error }) => {
  const [openImage, setOpenImage] = React.useState(false);
  const onImageHandleOpen = () => setOpenImage(true);
  const onImageHandleClose = () => setOpenImage(false);

  const [basicInfo, setBasicInfo] = React.useState(false);

  const [preview, setPreview] = React.useState();

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [username, setUsername] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [imageChange, setImageChange] = React.useState(false);

  const [selectedFiles, setSelectedFiles] = React.useState();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    setPreview(profileData ? profileData?.imagefield : "");
    setFirstName(profileData ? profileData?.first_name : "");
    setLastName(profileData ? profileData?.last_name : "");
    setUsername(profileData ? profileData?.username : "");
  }, [profileData]);

  React.useEffect(() => {
    if (selectedFiles) {
      const objectURL = URL.createObjectURL(selectedFiles);
      setPreview(objectURL);
    }
  }, [selectedFiles]);

  // Send APIs Request to receive Profile Data

  if (loading) {
    return (
      <Box flex={5} p={2} flexGrow={5}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }

  const onSubmitBasicHandler = (event) => {
    event.preventDefault();

    const first_name = firstName;
    const last_name = lastName;
    const send_username = username;

    console.log(first_name, last_name, send_username);

    // setBasicInfo(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onImageChangeHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFiles(undefined);
      return;
    }

    setSelectedFiles(event.target.files[0]);
  };

  const onImageDeleteHandler = () => {
    setSelectedFiles();
    setPreview(profileData?.imagefield);
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        backgroundColor={"background.default"}
        color={"text.primary"}
      >
        <LeftSidebar />
        {error ? (
          <Box flex={5} p={2} flexGrow={5}>
            <Alert severity="error">
              Error! Request failed with status code 404. Please refresh to try
              loading again.
            </Alert>
          </Box>
        ) : (
          <Box flex={5} flexGrow={5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={"space-between"}
            >
              <Stack direction={{ xs: "column", md: "row" }} gap={4}>
                <Button
                  aria-label="profile picture"
                  sx={{ position: "relative" }}
                  onClick={handleClick}
                >
                  <Avatar
                    alt={profileData?.first_name + " " + profileData?.last_name}
                    src={profileData?.imagefield}
                    sx={{ width: 300, height: 300 }}
                  >
                    {profileData?.first_name[0]}
                  </Avatar>
                  {isLoggedIn && (
                    <Fab
                      color="primary"
                      aria-label="Upload a new Photo"
                      sx={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                      }}
                    >
                      <AddAPhoto />
                    </Fab>
                  )}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {profileData?.imagefield && (
                    <MenuItem onClick={onImageHandleOpen}>
                      <Image /> See Profile Image
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => setImageChange(true)}>
                    <Upload /> Upload New Profile Image
                  </MenuItem>
                </Menu>
                <Stack direction={"column"} gap={2} justifyContent="center">
                  <Typography variant="h5" alignSelf={"center"}>
                    {profileData?.first_name + " " + profileData?.last_name}
                  </Typography>

                  <Typography variant="h5" alignSelf={"center"}>
                    @{profileData?.username}
                  </Typography>
                  <Stack direction={{ xs: "column", md: "row" }} gap={2} p={2}>
                    {profileData?.is_superuser && (
                      <Chip
                        label="Admin"
                        color="primary"
                        sx={{ paddingX: "1rem" }}
                      />
                    )}
                    <Chip
                      icon={<Cake />}
                      label={`Member since ${new Date(
                        profileData?.date_joined
                      ).getFullYear()}`}
                      sx={{ paddingX: "1rem" }}
                    />
                    <Chip
                      icon={<AccessTime />}
                      label={`Last seen ${moment(
                        new Date(profileData?.last_login)
                      ).fromNow()}`}
                      sx={{ paddingX: "1rem" }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Box p={2}>
                {isLoggedIn && (
                  <Button
                    variant={"outlined"}
                    startIcon={<Edit />}
                    onClick={() => setBasicInfo(true)}
                    sx={{
                      marginTop: { xs: "1rem" },
                      width: { xs: "100%" },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Stack>
            <Stack direction={"row"} marginY={4} gap={4} width="100%">
              <Box flex={2} flexGrow={2}>
                {isLoggedIn && <AddPost />}
                <Typography variant="h6" my={2}>
                  Recent Posts by You
                </Typography>
                {profileData?.postlist_author?.length === 0 && (
                  <Typography
                    color={"text.disabled"}
                    variant="subtitle1"
                    textAlign={"center"}
                    marginTop={10}
                  >
                    No Post Found in the System!
                  </Typography>
                )}
                {profileData?.postlist_author.map((item) => (
                  <Post
                    key={item.id}
                    id={item.id}
                    username={item.author_of_post.username}
                    fullName={
                      item.author_of_post.first_name +
                      " " +
                      item.author_of_post.last_name
                    }
                    authorImage={item.author_of_post.imagefield}
                    authorID={item.author_of_post.id}
                    imageData={item.imagefield}
                    created={item.created}
                    updated={item.updated}
                    content={item.content}
                    loveNumber={item.liked_post.length}
                    commentNumber={item.comment_on_post.length}
                    liked_post={item.liked_post}
                  />
                ))}
              </Box>
              <Box
                flex={1}
                flexGrow={1}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Typography variant="h6">Recent Activities by You</Typography>
                {profileData?.commentlist_author?.length === 0 && (
                  <Typography
                    color={"text.disabled"}
                    variant="subtitle1"
                    textAlign={"center"}
                  >
                    No activities in the System!
                  </Typography>
                )}
                {profileData?.commentlist_author.map((item) => (
                  <RecentActivities
                    key={item.id}
                    name={
                      item.author_of_comment.first_name +
                      " " +
                      item.author_of_comment.last_name
                    }
                    authorImage={item.author_of_comment.imagefield}
                    updated={item.updated}
                    created={item.created}
                    content={item.content}
                    postID={item.post_of_comment.id}
                  />
                ))}
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
      {/* Image Viewer */}
      <Modal
        open={openImage}
        onClose={onImageHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={onImageHandleClose}
            >
              Cancel
            </Button>
            <Typography
              id="modal-modal-title"
              variant="p"
              margin={"auto"}
              color="text.secondary"
            >
              Image Viewer
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Download />}
              color={"success"}
              sx={{ borderRadius: "20px" }}
              disabled
            >
              Download
            </Button>
          </Stack>

          <Stack direction={"row"} justifyContent="center">
            <Box
              mt={5}
              component={"img"}
              sx={{
                width: { xs: "98vw", md: "80vw" },
                maxHeight: "85vh",
              }}
              alt={profileData?.first_name + " " + profileData?.last_name}
              src={profileData?.imagefield}
            />
          </Stack>
        </Box>
      </Modal>
      {/* Basic Info Modal */}(
      <Modal
        open={basicInfo}
        onClose={() => setBasicInfo(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: { xs: "98vw", md: "50vw" } }}>
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={() => setBasicInfo(false)}
            >
              Cancel
            </Button>
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="text.secondary"
            >
              Edit Profile
            </Typography>
            <Box></Box>
          </Stack>

          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitBasicHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
              <Stack direction={"row"} justifyContent="space-between">
                <ChangePassword />
                <ChangeEmail />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>
      ){/* Upload Image Modal */}
      <Modal
        open={imageChange}
        onClose={() => setImageChange(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: { xs: "98vw", md: "50vw" } }}>
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={() => setImageChange(false)}
            >
              Cancel
            </Button>
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="text.secondary"
            >
              Update Profile Image
            </Typography>
            <Button
              component={"label"}
              variant="outlined"
              startIcon={<Upload />}
              color={"success"}
              sx={{ borderRadius: "20px" }}
            >
              <input
                accept="image/"
                name="image"
                type="file"
                onChange={onImageChangeHandler}
                multiple
                hidden
              />
              Upload
            </Button>
          </Stack>

          <Stack direction={"row"} justifyContent="center">
            <Avatar
              alt={profileData?.first_name + " " + profileData?.last_name}
              src={preview}
              sx={{ width: 300, height: 300 }}
            />
          </Stack>
          <Stack direction={"row"} justifyContent="space-between">
            <Button variant="contained" onClick={onImageDeleteHandler}>
              Delete
            </Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};
