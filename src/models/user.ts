import { IUser } from "../interface/user";

export class User implements IUser {
  _id: string
  lastName: string
  firstName: string
  phone: string
  bankAccount: string
  bonusAmount: number
  createdAt: string
  regNumber: string
  role: string
  transactionAmount: number
  userType: ["DRIVER", "CUSTOMER", "GUIDE"]
  email: string
  constructor({
    _id,
    firstName,
    lastName,
    phone,
    bankAccount,
    bonusAmount,
    createdAt,
    regNumber,
    role,
    transactionAmount,
    userType,
    email
  }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.bankAccount = bankAccount;
    this.bonusAmount = bonusAmount;
    this.createdAt = createdAt;
    this.regNumber = regNumber;
    this.role = role;
    this.transactionAmount = transactionAmount;
    this.userType = userType;
    this.email = email;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
