import React from "react";
import { useSelector } from "react-redux";

import { Post } from "./Post";
import { AddPost } from "./AddPost";
import { Error } from "../Layout/Error/Error";
import { Loading } from "../Layout/Loading/Loading";
import { useGetPost } from "../../hooks/PostHooks/useGetPost";

import { Box, Typography } from "@mui/material";

export const PublicFeed = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { postData, postLoading, postError, fetchPostData } = useGetPost();

  React.useEffect(() => {
    fetchPostData();
  }, []);

  if (postLoading) {
    return <Loading loading={postLoading} />;
  }

  if (postError) {
    return <Error />;
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

      {postData && postData?.length === 0 && (
        <Typography
          color={"text.disabled"}
          variant="subtitle1"
          textAlign={"center"}
          marginTop={10}
        >
          No Post Found in the System!
        </Typography>
      )}

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
            liked_post={item.liked_post}
          />
        ))}
    </Box>
  );
};
