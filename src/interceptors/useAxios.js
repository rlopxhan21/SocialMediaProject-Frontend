import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Redux/authSlice";

const baseURL = "http://localhost:8000";

export const useAxios = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.tokenInfo);

  const access = authToken?.access;

  const axiosInstance = axios.create({
    headers: { Authorization: `JWT ${access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const tokenExpireTime = moment(new Date(jwt_decode(access).exp * 1000));
    const isExpired = moment(new Date()).diff(tokenExpireTime, "seconds") > -20;

    if (!isExpired) return req;

    try {
      const response = await axios({
        url: baseURL + "auth/jwt/refresh/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          refresh: authToken?.refresh,
        },
      });

      req.headers.Authorization = `JWT ${response.data.access}`;
      dispatch(authActions.loginHandler(response.data));
      return req;
    } catch (error) {
      dispatch(authActions.logoutHandler());
      return;
    }
  });

  return axiosInstance;
};
