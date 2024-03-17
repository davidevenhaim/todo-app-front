import { ServerCode } from "./enums";

export interface iTodo {
  id: number;
  task: string;
  isCompleted: boolean;
  userId: number;
}

export interface iUser {
  id: number;
  username: string;
  todos: iTodo[];
  token: string;
  name: string;
}

export interface iUserLoginData {
  username: string;
  password: string;
}

export interface iUserRegisterData {
  username: string;
  name: string;
  password: string;
}

export interface iServerResponse {
  status: number;
  code: ServerCode;
  data?: any;
  msg?: string;
}
