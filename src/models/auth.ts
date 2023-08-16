import { IUser } from "../interface/user";
import { IAuth } from "../interface/auth";
import { BaseModel } from "./base-model";

export class Auth extends BaseModel implements IAuth {
  _id: string;
  name?: string | null;
  password?: string | null;
  token: string | null;
  user: IUser | null;
  deadline:  string | null;
  privacy:  boolean | null;

  constructor ({ name, password, token, user,deadline,_id,privacy }: IAuth) {
    super();
    this.name = name;
    this.password = password;
    this.token = token;
    this.user = user;
    this.deadline = deadline;
    this._id = _id;
    this.privacy= privacy;
  }

  static fromJson (json: IAuth) {
    return new Auth(json);    
  }
}