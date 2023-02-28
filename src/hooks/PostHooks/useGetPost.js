import React from "react";
import axios from "axios";

export const useGetPost = () => {
  const [postData, setPostData] = React.useState(null);
  const [postLoading, setPostLoading] = React.useState(false);
  const [postError, setPostError] = React.useState("");

  const fetchPostData = async () => {
    setPostLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + "/feed/post/",
      });
      setPostData(response.data);
      setPostLoading(false);
    } catch (error) {
      setPostError(error.response);
      setPostLoading(false);
    }
  };

  return { postData, postLoading, postError, fetchPostData };
};
