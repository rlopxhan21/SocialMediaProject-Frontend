import React from "react";
import { useAxios } from "../../interceptors/useAxios";

export const usePostComment = () => {
  const [newCommentData, setNewCommentData] = React.useState(null);
  const [newCommentLoading, setNewCommentLoading] = React.useState(false);
  const [newCommentError, setNewCommentError] = React.useState("");

  const axiosInstance = useAxios();

  const sendNewCommentData = async (newCommentData, postID) => {
    setNewCommentLoading(true);

    try {
      const response = await axiosInstance({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + `/feed/post/${postID}/comment/`,
        timeout: 5000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: newCommentData,
      });

      setNewCommentData(response.data);
      setNewCommentLoading(false);
    } catch (error) {
      setNewCommentLoading(false);
      setNewCommentError(error.response);
    }
  };

  return {
    newCommentData,
    newCommentLoading,
    newCommentError,
    sendNewCommentData,
  };
};
