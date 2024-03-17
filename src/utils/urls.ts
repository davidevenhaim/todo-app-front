const users = "users";
const todos = "todos";

// @@ Auth urls
export const loginUserUrl = `/${users}/login`;
export const registerUserUrl = `/${users}/register`;
export const logoutUserUrl = `/${users}/logout`;
export const decodeTokenUrl = `/${users}/decodeToken`;

// @@ Todos urls
export const createTodoUrl = `/${todos}/create`;
export const updateTodoUrl = `/${todos}/update`;
export const deleteTodoUrl = `/${todos}/delete`;
export const getTodoUrl = `/${todos}`;
