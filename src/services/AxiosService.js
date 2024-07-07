import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { reqRefreshToken } from "../redux/slice/auth.slice";
import { store } from "../redux/store";

export const Axios = axios.create({
  timeout: 15000,
  baseURL: process.env.REACT_APP_BACK_END_URL + "/api/v1",
});

export const AxiosAuth = axios.create({
  timeout: 15000,
  baseURL: process.env.REACT_APP_BACK_END_URL + "/api/v1",
});

AxiosAuth.interceptors.request.use(
  async (config) => {
    let { auth } = store.getState("auth");
    let { accessToken, refreshToken } = auth.account;
    if (!accessToken) return config;

    let date = new Date();
    let decodedAccessToken = jwtDecode(accessToken);

    // expire access token is valid
    if (decodedAccessToken?.exp > date.getTime() / 1000) {
      return {
        ...config,
        headers: {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        },
      };
    }

    // request refresh token when access token is expired
    try {
      let { data } = await Axios.post("/auth/refresh-token", { refreshToken });

      store.dispatch(reqRefreshToken(data.accessToken));
      config.headers["authorization"] = "Bearer " + data.accessToken;
    } catch (err) {
      alert(err.response?.data);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
