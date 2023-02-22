import React from "react";
import { Alert, Backdrop, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "./Post";
import AddPost from "./AddPost";
import { useGetRequest } from "../../hooks/api";

const Feed = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { data: postData, loading, error } = useGetRequest("feed/post/");

  if (loading) {
    return (
      <Box flex={4} p={2} flexGrow={4} marginBottom={8} id="home">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={4} p={2} flexGrow={4} marginBottom={8} id="home">
        <Alert severity="error">
          Error! Request failed with status code 404. Please refresh to try
          loading again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      flex={4}
      flexGrow={4}
      marginTop={2}
      marginBottom={8}
      minHeight={"100vh"}
      id="home"
    >
      {isLoggedIn && <AddPost />}
      {postData &&
        postData.map((item) => (
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
            imageData={item.imagefield}
            authorID={item.author_of_post.id}
            created={item.created}
            updated={item.updated}
            content={item.content}
            loveNumber={item.liked_post.length}
            commentNumber={item.comment_on_post.length}
          />
        ))}
    </Box>
  );
};

export default Feed;
