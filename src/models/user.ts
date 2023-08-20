import { IUser } from "../interface/user";

export class User implements IUser {
  firstName: string;
  lastName: string;
  userTypes: string;
  phone: string;
  privacy:boolean;
  constructor({
    firstName,
    lastName,
    userTypes,
    phone,
    privacy
  }: IUser) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userTypes = userTypes;
    this.phone = phone;
    this.privacy= privacy;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
