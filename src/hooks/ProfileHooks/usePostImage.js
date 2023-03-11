import React from "react";
import { useAxios } from "../../interceptors/useAxios";

export const usePostImage = () => {
  const [imageData, setImageData] = React.useState();
  const [imageLoading, setImageLoading] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const axiosInstance = useAxios();

  const sendImageData = async (profileID, profileImageData) => {
    setImageLoading(true);

    try {
      const response = await axiosInstance({
        method: "POST",
        url:
          process.env.REACT_APP_BASE_URL +
          `/useraccount/updateimage/${profileID}/`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: profileImageData,
      });

      setImageData(response.data);
      setImageLoading(false);
    } catch (error) {
      setImageError(true);
      setImageLoading(false);
    }
  };

  return { imageData, imageLoading, imageError, sendImageData };
};
