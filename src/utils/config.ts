// no .env in github cause of the .gitignore
const env = process.env.REACT_ENV || "LOCAL";

// "http://localhost:3000"
export const HOST_API =
  env === "LOCAL"
    ? "http://192.168.1.178:3000"
    : "https://some-deployed-server.idf";
export const userLocalStorageKey = "login-state";
