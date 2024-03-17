import axios from "axios";
import { HOST_API } from "./config";

const axiosInstance = axios.create({
  baseURL: HOST_API,
});
axios.defaults.baseURL = HOST_API;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export const post = async (
  url: string,
  data: any,
  headers: Record<string, string> = {},
  token?: string
) => {
  const reqHeaders = {
    ...headers,
  };
  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  return axios.post(url, data, {
    headers: reqHeaders,
  });
};

export const get = async (
  url: string,
  token?: string,
  headers: Record<string, string> = {}
) => {
  const reqHeaders = {
    ...headers,
  };

  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  return axios.get(url, {
    headers: reqHeaders,
    withCredentials: false,
  });
};

export const del = async (
  url: string,
  data: any = {},
  headers: Record<string, string> = {},
  token?: string
) => {
  const reqHeaders = {
    ...headers,
  };
  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  return axios.delete(url, {
    headers: reqHeaders,
    data,
  });
};

export const put = async (
  url: string,
  data: any,
  headers: Record<string, string> = {},
  token?: string
) => {
  const reqHeaders = {
    ...headers,
  };
  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  return axios.put(url, data, {
    headers: reqHeaders,
    withCredentials: true,
  });
};
