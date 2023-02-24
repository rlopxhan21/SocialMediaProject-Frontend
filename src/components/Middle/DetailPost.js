import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import {
  ArrowBack,
  Cancel,
  Clear,
  DeleteForever,
  Download,
  Edit,
  Favorite,
  FavoriteBorder,
  InsertPhoto,
  Link,
  ModeComment,
  MoreVert,
  Share,
  Wysiwyg,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Backdrop,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  CircularProgress,
  Fab,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RecentActivities from "../Rightside/RecentActivities";
import { useGetRequest } from "../../hooks/api";

const style = {
  position: "absolute",
  top: { xs: "40%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: "90vw" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  paddingBottom: 6,
  overflow: "hidden",
};

const DetailPost = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openImage, setOpenImage] = React.useState(false);

  const [selectedFiles, setSelectedFiles] = React.useState();
  const [preview, setPreview] = React.useState();
  const [errorComment, setErrorComment] = React.useState(false);

  const [commentInput, setCommentInput] = React.useState("");

  const [imagePresentInPost, setImagePresentInPost] = React.useState(false);
  const { postID } = useParams();

  React.useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFiles);
    setPreview(objectURL);
  }, [selectedFiles]);

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

  // Receiving Post Data from Backend
  const {
    data: postData,
    loading,
    error,
  } = useGetRequest(`feed/post/${postID}`);

  React.useEffect(() => {
    if (postData) {
      postData?.imagefield && setImagePresentInPost(true);
    }
  }, [postData]);

  const onVertClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onVertCloseHandler = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  const onLoveHandler = (event) => {
    if (isLoggedIn) {
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return (
      <Box flex={12} direction="row" p={2} flexGrow={6} marginBottom={8}>
        <Alert severity="error">
          Error! Request failed with status code 404. Please refresh to try
          loading again.
        </Alert>
      </Box>
    );
  }

  const onImageHandleOpen = () => setOpenImage(true);
  const onImageHandleClose = () => setOpenImage(false);

  const onCommentSubmitHandler = (event) => {
    event.preventDefault();

    const content = event.target.comment.value;

    if (content.length === 0) {
      setErrorComment(true);
    } else {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("imagefield", selectedFiles);

      setErrorComment(false);
      setSelectedFiles();
      setPreview();
      setCommentInput("");
    }
  };
  return (
    <Stack
      flex={6}
      direction="row"
      p={2}
      flexGrow={6}
      marginBottom={8}
      minHeight="100vh"
    >
      {/* Image */}
      {postData?.imagefield && (
        <Box
          flex={3}
          p={2}
          flexGrow={3}
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "10px",
            p: 4,
            paddingBottom: 6,
            display: { xs: "none", lg: "block" },
          }}
        >
          <Stack direction={"row"} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              color={"error"}
              sx={{ borderRadius: "20px" }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              color={"success"}
              sx={{ borderRadius: "20px" }}
              component={RouterLink}
              to={postData && postData?.imagefield}
              target={"_blank"}
              download
            >
              Download
            </Button>
          </Stack>

          <Stack direction={"row"} justifyContent="center">
            <Box
              mt={5}
              component={"img"}
              sx={{
                width: { xs: "98vw", md: 1280 },
                maxHeight: 1536,
              }}
              alt={postData && postData?.content}
              src={postData && postData?.imagefield}
            />
          </Stack>
        </Box>
      )}

      {/* Post Detail */}
      <Card
        flex={1}
        p={2}
        flexGrow={1}
        elevation={0}
        sx={{
          margin: "auto",
          marginTop: "10px",
          width: { sx: "90%", md: "60%" },
        }}
      >
        {!postData?.imagefield && (
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            color={"error"}
            sx={{ borderRadius: "20px" }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
        <CardHeader
          avatar={
            <IconButton
              component={RouterLink}
              to={`/profile/${postData?.author_of_post?.id}`}
            >
              <Avatar
                sx={{ bgcolor: "red" }}
                src={postData?.author_of_post?.imagefield}
                aria-label="recipe"
              >
                {postData?.author_of_post?.first_name[0]}
              </Avatar>
            </IconButton>
          }
          action={
            <React.Fragment>
              <IconButton aria-label="settings" onClick={onVertClickHandler}>
                <MoreVert />
              </IconButton>
              <Menu
                id="post-menu"
                MenuListProps={{
                  "aria-labelledby": "post-menu",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={onVertCloseHandler}
              >
                {isLoggedIn && (
                  <MenuItem onClick={onVertCloseHandler}>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    Edit Post
                  </MenuItem>
                )}
                <MenuItem onClick={onVertCloseHandler}>
                  <ListItemIcon>
                    <Wysiwyg />
                  </ListItemIcon>
                  View Post
                </MenuItem>
                <MenuItem onClick={onVertCloseHandler}>
                  <ListItemIcon>
                    <Link />
                  </ListItemIcon>
                  Copy Link
                </MenuItem>
                {isLoggedIn && (
                  <MenuItem onClick={onVertCloseHandler}>
                    <ListItemIcon>
                      <DeleteForever />
                    </ListItemIcon>
                    Delete Post
                  </MenuItem>
                )}
              </Menu>
            </React.Fragment>
          }
          title={
            <Typography
              variant="span"
              color={"text.primary"}
              sx={{
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
                textDecoration: "none",
              }}
              component={RouterLink}
              to={`/profile/${postData?.author_of_post?.id}`}
            >
              @{postData?.author_of_post?.username} |{" "}
              {postData?.author_of_post?.first_name}{" "}
              {postData?.author_of_post?.last_name}
            </Typography>
          }
          subheader={moment(new Date(postData?.updated)).fromNow()}
        />
        {imagePresentInPost && (
          <CardMedia
            component="img"
            height="20%"
            image={postData?.imagefield}
            alt={postData?.content}
            sx={{
              "&:hover": { cursor: "pointer" },
              display: { xs: "block", lg: "none" },
              maxWidth: "92vw",
            }}
            onClick={onImageHandleOpen}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postData?.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onLoveHandler}>
            <Checkbox
              icon={
                <Badge
                  badgeContent={postData?.liked_post?.length}
                  max={99}
                  color="secondary"
                >
                  <FavoriteBorder />
                </Badge>
              }
              checkedIcon={
                <Badge
                  badgeContent={postData?.liked_post?.length}
                  max={99}
                  color="secondary"
                >
                  <Favorite sx={{ color: "red" }} />
                </Badge>
              }
            />
          </IconButton>

          <IconButton aria-label="comment">
            <Badge
              badgeContent={postData?.comment_on_post?.length}
              max={99}
              color="secondary"
            >
              <ModeComment />
            </Badge>
          </IconButton>

          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>

        {postData?.comment_on_post?.map((item) => (
          <RecentActivities
            key={item.id}
            name={
              item.author_of_comment.first_name +
              " " +
              item.author_of_comment.last_name
            }
            created={item.created}
            updated={item.updated}
            content={item.content}
            imageData={item.imagefield}
          />
        ))}
        {postData?.comment_on_post?.length === 0 && (
          <Typography variant="body2">Be First to add comment.</Typography>
        )}

        {!isLoggedIn && (
          <Typography color={"text.disabled"} variant="subtitle1" mt={2}>
            You need to{" "}
            <Typography variant="span" component={RouterLink} to="/login">
              Log In
            </Typography>{" "}
            to comment on the post.
          </Typography>
        )}

        {isLoggedIn && (
          <Card
            sx={{ marginTop: 4 }}
            component="form"
            noValidate
            onSubmit={onCommentSubmitHandler}
          >
            <Stack direction={"row"} alignItems="center" py={1}>
              <IconButton>
                <Avatar
                  alt="name"
                  sx={{ height: { xs: 30, md: 60 }, width: { xs: 30, md: 60 } }}
                  src="ans"
                >
                  R
                </Avatar>
              </IconButton>
              <TextField
                id="outlined-textarea"
                name="comment"
                variant="outlined"
                label="Write a comment..."
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                multiline
                fullWidth
                error={errorComment}
              />
            </Stack>
            <Box position={"relative"}>
              {selectedFiles && (
                <Box
                  component="img"
                  sx={{
                    width: 100,
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
                    top: "-7px",
                    left: "87px",
                    zIndex: 999,
                  }}
                  onClick={onImageDeleteHandler}
                >
                  <Clear />
                </Fab>
              )}
            </Box>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit">Post</Button>
              <Button sx={{ width: "200px" }} component={"label"}>
                <InsertPhoto />
                <input
                  accept="image/"
                  name="image"
                  type="file"
                  onChange={onImageChangeHandler}
                  multiple
                  hidden
                />
              </Button>
            </ButtonGroup>
          </Card>
        )}
      </Card>

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
              variant={{ xs: "p", sm: "h6" }}
              margin="auto"
              color="text.secondary"
            >
              Image Viewer
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Download />}
              color={"success"}
              sx={{ borderRadius: "20px" }}
              component={RouterLink}
              to={postData?.imagefield}
              target="_blank"
              download
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
              alt={postData?.content}
              src={postData?.imagefield}
            />
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default DetailPost;
