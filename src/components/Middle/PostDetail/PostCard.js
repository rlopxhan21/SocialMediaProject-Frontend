import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import RecentActivities from "../../Rightside/RecentActivities";
import { Comment } from "./Comment";

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
  DeleteForever,
  Edit,
  Favorite,
  FavoriteBorder,
  Link,
  ModeComment,
  MoreVert,
  Share,
  Wysiwyg,
} from "@mui/icons-material";

export const PostCard = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const onLoveHandler = (event) => {};

  return (
    <Card
      flex={1}
      p={2}
      flexGrow={1}
      elevation={0}
      sx={{
        margin: "auto",
        marginTop: "10px",
        width: { xs: "90%", xl: "60%" },
      }}
    >
      <CardHeader
        avatar={
          <IconButton
            component={RouterLink}
            to={`/profile/${props.postData?.author_of_post?.id}`}
          >
            <Avatar
              sx={{ bgcolor: "red" }}
              src={props.postData?.author_of_post?.imagefield}
              aria-label="recipe"
            >
              {props.postData?.author_of_post?.first_name[0]}
            </Avatar>
          </IconButton>
        }
        action={
          // Post three dot
          <React.Fragment>
            <IconButton
              aria-label="settings"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="post-menu"
              MenuListProps={{
                "aria-labelledby": "post-menu",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {isLoggedIn && (
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  Edit Post
                </MenuItem>
              )}
              <MenuItem onClick={() => setAnchorEl(null)}>
                <ListItemIcon>
                  <Wysiwyg />
                </ListItemIcon>
                View Post
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                <ListItemIcon>
                  <Link />
                </ListItemIcon>
                Copy Link
              </MenuItem>
              {isLoggedIn && (
                <MenuItem onClick={() => setAnchorEl(null)}>
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
            to={`/profile/${props.postData?.author_of_post?.id}`}
          >
            @{props.postData?.author_of_post?.username} |{" "}
            {props.postData?.author_of_post?.first_name}{" "}
            {props.postData?.author_of_post?.last_name}
          </Typography>
        }
        subheader={moment(new Date(props.postData?.updated)).fromNow()}
      />

      {props.postData?.imagefield && (
        <Box display={{ xs: "block", xl: "none" }}>
          <CardMedia
            component="img"
            height="20%"
            image={props.postData?.imagefield}
            alt={props.postData?.content}
            onClick={() => props.setImageViewer(true)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          />
        </Box>
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.postData?.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLoveHandler}>
          {/* {!isLiked && ( */}
          <Badge
            badgeContent={props.postData?.liked_post?.length}
            max={99}
            color="secondary"
          >
            <FavoriteBorder />
          </Badge>
          {/* )} */}
          {/* {isLiked && (
            <Badge
              badgeContent={props.postData?.liked_post?.length}
              max={99}
              color="secondary"
            >
              <Favorite sx={{ color: "red" }} />
            </Badge>
          )} */}
        </IconButton>

        <IconButton aria-label="comment">
          <Badge
            badgeContent={props.postData?.comment_on_post?.length}
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

      {props.postData?.comment_on_post?.map((item) => (
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
      {props.postData?.comment_on_post?.length === 0 && (
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

      {isLoggedIn && <Comment />}
    </Card>
  );
};
