import React from "react";
import { useParams } from "react-router-dom";

import { useAuthPostRequest, useGetRequest } from "../../../hooks/api";

import { ImageViewer } from "../../Layout/ImageViewer/ImageViewer";
import { Error } from "../../Layout/Error/Error";
import { Loading } from "../../Layout/Loading/Loading";

import { Stack } from "@mui/material";
import { PostImage } from "./PostImage";
import { PostCard } from "../../Layout/Card/PostCard";

export const DetailPost = () => {
  // Image Viewer State
  const [imageViewer, setImageViewer] = React.useState(false);

  const { postID } = useParams();

  // Receiving Post Data from Backend
  const [url, setURL] = React.useState(`feed/post/${postID}`);
  const { data: postData, loading, error } = useGetRequest(url);

  // TO send like POST request
  const [urlData, setUrlData] = React.useState({ url: "", data: "" });
  const { data: LikeData } = useAuthPostRequest(urlData.url, urlData.data);

  React.useEffect(() => {
    LikeData && setURL(`feed/post/${postID}/`);
    setUrlData({ url: "", data: "" });
  }, [LikeData, postID]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Stack
      flex={6}
      direction={{ xs: "column-reverse", xl: "row" }}
      flexGrow={6}
      marginBottom={8}
      minHeight="100vh"
    >
      <PostImage postData={postData} setImageViewer={setImageViewer} />
      <PostCard postData={postData} />
      <ImageViewer
        postData={postData}
        imageViewer={imageViewer}
        setImageViewer={setImageViewer}
      />
    </Stack>
  );
};
