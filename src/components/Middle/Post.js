import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { useAuthPostRequest } from "../../hooks/api";

import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Edit,
  Wysiwyg,
  Link,
  DeleteForever,
  ModeComment,
} from "@mui/icons-material";

export const Post = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const onVertClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onVertCloseHandler = () => {
    setAnchorEl(null);
  };

  // Receiving Post Data from Backend
  // const [url, setURL] = React.useState(`feed/post/`);
  // const { data: postData } = useGetRequest(url);

  // importing login state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  // Importing user detail and postData from redux
  const userData = useSelector((state) => state.auth.curentUserData);

  // console.log(props.liked_post);
  console.log(userData);

  const postLike = props.liked_post.filter(
    (item) => userData?.email === item?.author
  );

  const isPostLiked = postLike.length > 0;

  // console.log(isPostLiked);

  // TO send like POST request
  const [urlData, setUrlData] = React.useState({ url: "", data: "" });
  const {
    data: LikeData,
    error,
    loading,
  } = useAuthPostRequest(urlData.url, urlData.data);

  React.useEffect(() => {
    LikeData && console.log("hello");
  }, [LikeData]);

  const onLoveHandler = (event) => {
    if (isLoggedIn) {
      setUrlData({
        url: `feed/post/${props.id}/like/`,
        data: { like: "yes" },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <Card
      sx={{
        marginTop: "10px",
        width: { xs: "100vw", md: "100%" },
      }}
    >
      <CardHeader
        avatar={
          <IconButton component={RouterLink} to={`/profile/${props.authorID}`}>
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
              src={props.authorImage ? props.authorImage : ""}
            >
              {props.fullName[0]}
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
            sx={{
              "&:hover": { textDecoration: "underline", cursor: "pointer" },
              textDecoration: "none",
            }}
            color="text.primary"
            component={RouterLink}
            to={`/profile/${props.authorID}`}
          >
            @{props.username} | {props.fullName}
          </Typography>
        }
        subheader={moment(new Date(props.updated)).fromNow()}
      />
      {props.imageData && (
        <Box component={RouterLink} to={`/post/${props.id}`}>
          <CardMedia
            component="img"
            height="20%"
            image={props.imageData}
            alt={props.conent}
            sx={{ "&:hover": { cursor: "pointer" } }}
          />
        </Box>
      )}
      <CardContent>
        <Box
          component={RouterLink}
          to={`/post/${props.id}`}
          sx={{ textDecoration: "none" }}
        >
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLoveHandler}>
          {!isPostLiked && (
            <Badge badgeContent={props.loveNumber} max={99} color="secondary">
              <FavoriteBorder />
            </Badge>
          )}
          {isPostLiked && (
            <Badge badgeContent={props.loveNumber} max={99} color="secondary">
              <Favorite sx={{ color: "red" }} />
            </Badge>
          )}
        </IconButton>

        <IconButton
          aria-label="comment"
          component={RouterLink}
          to={`/post/${props.id}`}
        >
          <Badge badgeContent={props.commentNumber} max={99} color="secondary">
            <ModeComment />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};
