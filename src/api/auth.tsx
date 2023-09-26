import { IEditForm } from "../components/auth/edit-profile-form";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};

export const login = async (data: { name: string, password: string }) => {
  const res = await httpRequest.post("/users/login", data);
  return res;
};
export const deleteUser = async (id: string) => {
  const res = await httpRequest.del(`/user/${id}`);
  return res;
};
export const signUp = async (data: {
  lastName: string,
  firstName: string,
  password: string,
  regNumber: string,
  bankAccountNumber: string,
  bankAccount: string,
  phone: string,
  userType: string,
}) => {
  const res = await httpRequest.post("/user/register", data);
  return res;
};

export const editProfile = async({data, id} : {data: IEditForm, id: string}) => {
  const res = await httpRequest.put(`/user/${id}`, data)
}

export const logout = async () => {
  const res = await httpRequest.get("/user/logout");
  return res;
};

