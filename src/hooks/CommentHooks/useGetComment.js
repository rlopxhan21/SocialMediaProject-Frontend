import React from "react";
import axios from "axios";

export const useGetComment = () => {
  const [commentData, setCommentData] = React.useState();
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [commentError, setCommentError] = React.useState(false);

  const fetchCommentData = async () => {
    setCommentLoading(true);

    try {
      const response = await axios({
        method: "GET",
        timeout: 5000,
        url: process.env.REACT_APP_BASE_URL + "/feed/comment/",
      });

      setCommentData(response.data);
      setCommentLoading(false);
    } catch (error) {
      setCommentError(true);
      setCommentLoading(false);
    }
  };

  return { commentData, commentLoading, commentError, fetchCommentData };
};
