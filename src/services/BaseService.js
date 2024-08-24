import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { reqRefreshToken } from "../redux/slice";
import store  from "../redux/store";

export const AxiosAuth = axios.create({
  timeout: 15000,
  baseURL: process.env.REACT_APP_BACK_API_URL + "/api/v1",
});

AxiosAuth.interceptors.request.use(
  async (config) => {
    let { auth } = store.getState("auth");
    let { accessToken, refreshToken } = auth.account;
    if (!accessToken) return config;

    let date = new Date();
    let decodedAccessToken = jwtDecode(accessToken);

    if (decodedAccessToken?.exp > date.getTime() / 1000) {
      return {
        ...config,
        headers: {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        },
      };
    }

    try {
      let { data } = await axios.post("/auth/refresh-token", { refreshToken });

      store.dispatch(reqRefreshToken(data.accessToken));
      config.headers["authorization"] = "Bearer " + data.accessToken;
    } catch (err) {
      alert(err.response?.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class BaseService {
  constructor() {
    this.api = AxiosAuth;
  }

  get(endpoint, params) {
    return this.api.get(endpoint, { params });
  }

  post(endpoint, data) {
    return this.api.post(endpoint, data);
  }

  put(endpoint, data) {
    return this.api.put(endpoint, data);
  }

  delete(endpoint) {
    return this.api.delete(endpoint);
  }

  handleError(error) {
    console.error('API Error: ', error);
  }
}

export default BaseService;
