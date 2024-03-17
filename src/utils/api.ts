// @@ Axios
import { AxiosResponse } from "axios";
import { del, get, post, put } from "./axios";

// @@ Types & Constants
import { iServerResponse, iUser } from "./types";
import {
  createTodoUrl,
  decodeTokenUrl,
  deleteTodoUrl,
  getTodoUrl,
  loginUserUrl,
  logoutUserUrl,
  registerUserUrl,
  updateTodoUrl,
} from "./urls";
import { ServerCode } from "./enums";

// function that will generally check response from server and return a suitable msg,
const checkHttpStatus = (resp: AxiosResponse): iServerResponse => {
  const res: iServerResponse = {
    status: resp.status,
    data: {},
    code: ServerCode.Err,
  };
  if (resp.status === 200 || resp.status === 201) {
    res.code = resp.data.code || ServerCode.Ok;
    res.data = resp.data.data;
    res.msg = resp.data.msg || "OK";
  } else {
    res.msg = "No correct response received";
  }

  return res;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<iServerResponse> => {
  try {
    const data = { username, password };
    return checkHttpStatus(await post(loginUserUrl, data));
  } catch (err: any) {
    console.warn("ERR: Login failed. with msg: ", err.msg);
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const registerUser = async (
  username: string,
  name: string,
  password: string
): Promise<iServerResponse> => {
  try {
    return checkHttpStatus(
      await post(registerUserUrl, { username, name, password })
    );
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const logoutUser = async (token: string): Promise<iServerResponse> => {
  // invalidate the token.
  try {
    return checkHttpStatus(await post(logoutUserUrl, { token }));
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const decodeToken = async (token: string): Promise<iServerResponse> => {
  // invalidate the token.
  try {
    return checkHttpStatus(await post(decodeTokenUrl, { token }));
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const createTodo = async (
  task: string,
  user: iUser
): Promise<iServerResponse> => {
  try {
    return checkHttpStatus(
      await post(createTodoUrl, {
        task,
        userId: user.id,
        user: { id: user.id, name: user.name, username: user.username },
      })
    );
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const updateTodo = async (
  newTask: string,
  isCompleted: boolean,
  userId: number,
  todoId: number
): Promise<iServerResponse> => {
  try {
    return checkHttpStatus(
      await put(`${updateTodoUrl}/${todoId}`, {
        task: newTask,
        userId,
        isCompleted,
      })
    );
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const deleteTodo = async (
  todoId: number,
  userId: number
): Promise<iServerResponse> => {
  try {
    return checkHttpStatus(await del(`${deleteTodoUrl}/${todoId}/${userId}`));
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};

export const getTodo = async (
  todoId: number,
  userId: number
): Promise<iServerResponse> => {
  try {
    return checkHttpStatus(await get(`${getTodoUrl}/${todoId}/${userId}`));
  } catch (err: any) {
    return {
      status: 500,
      code: ServerCode.Err,
      msg: err.msg || "ERROR",
    };
  }
};
