import { createContext, useState, useContext, ReactNode } from "react";
import { iUserLoginData, iUser, iUserRegisterData } from "../utils/types";
import { loginUser, logoutUser, registerUser } from "../utils/api";
import { ServerCode } from "../utils/enums";
import storage, { LOCA_DATA_EXPIRY } from "./AsyncStorage";
import { userLocalStorageKey } from "../utils/config";
import axios from "axios";

interface AuthContextType {
  user: iUser | null;
  login: (userData: iUserLoginData) => null | Promise<undefined | string>;
  logout: () => null | Promise<undefined | string>;
  register: (
    newUserData: iUserRegisterData
  ) => null | Promise<undefined | string>;
  handleSetUser: (user: iUser) => void;
}

const initialValue: AuthContextType = {
  user: null,
  login: (userData) => null,
  logout: () => null,
  register: (newUser) => null,
  handleSetUser: (user: iUser) => null,
};

const AuthContext = createContext<AuthContextType>(initialValue);

interface Props {
  children?: ReactNode;
}

const saveStorage = (data: Object) => {
  storage.save({
    key: userLocalStorageKey,
    data: {
      ...data,
    },
    expires: LOCA_DATA_EXPIRY,
  });
};

export const handleSetDefaultToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<iUser | null>(null);

  const login = async ({
    username,
    password,
  }: iUserLoginData): Promise<undefined | string> => {
    const res = await loginUser(String(username).toLowerCase(), password);
    if (res.code === ServerCode.Ok) {
      const userData = res.data as iUser;
      setUser(userData);
      saveStorage({ token: userData.token });
      handleSetDefaultToken(userData.token);
    } else {
      setUser(null);
      return res.msg || "err";
    }
  };

  const logout = async (): Promise<undefined | string> => {
    setUser(null);
    storage.remove({ key: userLocalStorageKey });
    const res = await logoutUser(user?.token || "");
    if (res.code === ServerCode.Err) {
      // for logs
      console.warn("Logout failed - TOKEN: ", user?.token, " is still valid.");
      return res.msg;
    }
  };

  const register = async ({
    username,
    name,
    password,
  }: iUserRegisterData): Promise<undefined | string> => {
    const res = await registerUser(
      String(username).toLowerCase(),
      name,
      password
    );
    if (res.code === ServerCode.Ok) {
      const userData = res.data as iUser;
      setUser(userData);
      saveStorage({ token: userData.token });
      handleSetDefaultToken(userData.token);
    } else {
      setUser(null);
      return res.msg;
    }
  };

  const handleSetUser = (userInfo: iUser) => {
    setUser(userInfo);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, handleSetUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
