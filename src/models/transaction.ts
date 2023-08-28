import { ITransaction } from "../interface/transaction";

export class Transaction implements ITransaction {
  _id: string
      bonusAmount: number
      createdAt: string
      findUser: string
      isActive: boolean
      isPaid: boolean
      transactionAmount: number
      type: string
      updatedAt: string

  constructor ({ bonusAmount, createdAt, findUser, isActive,isPaid,_id,transactionAmount,type,updatedAt }: ITransaction) {
    this.bonusAmount = bonusAmount;
    this.createdAt = createdAt;
    this.findUser = findUser;
    this.isActive = isActive;
    this.isPaid = isPaid;
    this._id = _id;
    this.type= type;
    this.transactionAmount= transactionAmount;
    this.updatedAt= updatedAt;
  }

  static fromJson (json: ITransaction) {
    return new Transaction(json);    
  }
}