import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAxios } from "../interceptors/useAxios";

const baseURL = "https://rlopxhan021.pythonanywhere.com/";

// Public GET Request
export const useGetRequest = (url) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: baseURL + url,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Authorized GET Request
export const useAuthGetRequest = (url) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const axiosInstance = useAxios();

  React.useEffect(() => {
    setLoading(true);

    const postData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: baseURL + url,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      postData();
    } else {
      return;
    }
  }, [url, isLoggedIn]);

  return { data, loading, error };
};

// Public POST Request
export const usePostRequest = (url, dataToSend) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (dataToSend.length === 0) {
      return;
    }

    setLoading(true);
    const postData = async () => {
      try {
        const response = await axios({
          url: baseURL + url,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: dataToSend,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    postData();
  }, [url, dataToSend]);

  return { data, loading, error };
};

// Authorized POST Request
export const useAuthPostRequest = (url, dataToSend) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const axiosInstance = useAxios();

  React.useEffect(() => {
    if (dataToSend.length === 0 || url.length === 0) {
      return;
    }
    setLoading(true);
    const postData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: baseURL + url,
          headers: { "Content-Type": "application/json" },
          data: dataToSend,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      postData();
    } else {
      return;
    }
  }, [url, dataToSend, isLoggedIn]);

  return { data, loading, error };
};

// Authorized POST FiLE Request
export const useAuthPostFileRequest = (url, frmData) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const axiosInstance = useAxios();

  React.useEffect(() => {
    if (frmData.length === 0 || url.length === 0) {
      return;
    }
    setLoading(true);
    const postData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: baseURL + url,
          headers: { "Content-Type": "multipart/form-data" },
          data: frmData,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      postData();
    } else {
      return;
    }
  }, [url, frmData, isLoggedIn]);

  return { data, loading, error };
};
