import React from "react";
import axios from "axios";

export const useGetDetailPost = () => {
  const [detailPostData, setDetailPostData] = React.useState(null);
  const [detailPostLoading, setDetailPostLoading] = React.useState(false);
  const [detailPostError, setDetailPostError] = React.useState("");

  const fetchDetailPostData = React.useCallback(async (postID) => {
    setDetailPostLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + `/feed/post/${postID}`,
      });
      setDetailPostData(response.data);
      setDetailPostLoading(false);
    } catch (error) {
      setDetailPostError(error.response);
      setDetailPostLoading(false);
    }
  }, []);

  return {
    detailPostData,
    detailPostLoading,
    detailPostError,
    fetchDetailPostData,
  };
};
