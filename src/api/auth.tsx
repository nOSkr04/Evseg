import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/user/me");
  return res.data;
};

export const login = async (data: { phone: string, password: string }) => {
  const res = await httpRequest.post("/user/login", data);
  return res;
};
export const deleteUser = async (id: string) => {
  const res = await httpRequest.del(`/user/${id}`);
  return res;
};
export const signUp = async (data: {
  lastname: string,
  firstname: string,
  password: string,
  register: string,
  bankAccountNumber: string,
  bankAccount: string,
  passwordVerify: string,
  phone: string,
}) => {
  const res = await httpRequest.post("/user/register", data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/user/logout");
  return res;
};

