import React from "react";
import { useAxios } from "../../interceptors/useAxios";

export const useNewPost = () => {
  const [newPostData, setNewPostData] = React.useState(null);
  const [newPostLoading, setNewPostLoading] = React.useState(false);
  const [newPostError, setNewPostError] = React.useState("");

  const axiosInstance = useAxios();

  const sendNewPostData = async (newPostData) => {
    setNewPostLoading(true);

    try {
      const response = await axiosInstance({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + "/feed/post/",
        timeout: 5000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: newPostData,
      });

      setNewPostData(response.data);
      setNewPostLoading(false);
    } catch (error) {
      setNewPostLoading(false);
      setNewPostError(error.response);
    }
  };

  return { newPostData, newPostLoading, newPostError, sendNewPostData };
};
