import { IUser } from "../interface/user";

export class User implements IUser {
  _id: string;
  auth: string;
  name: string;
  deadline: string;
  privacy:boolean;
  constructor({
    _id,
    auth,
    name,
    deadline,
    privacy
  }: IUser) {
    this._id = _id;
    this.auth = auth;
    this.name = name;
    this.deadline = deadline;
    this.privacy= privacy;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
