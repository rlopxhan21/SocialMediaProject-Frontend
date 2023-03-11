import React from "react";
import { useAxios } from "../../interceptors/useAxios";

export const usePostLike = () => {
  const [likeData, setLikeData] = React.useState();
  const [likeLoading, setLikeLoading] = React.useState(false);
  const [likeError, setLikeError] = React.useState(false);

  const axiosInstance = useAxios();

  const sendLikeData = async (postID) => {
    setLikeLoading(true);

    try {
      const response = await axiosInstance({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL + `/feed/post/${postID}/like/`,
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLikeData(response.data);
      setLikeLoading(false);
    } catch (error) {
      setLikeError(true);
      setLikeLoading(false);
    }
  };

  return { likeData, likeLoading, likeError, sendLikeData };
};
