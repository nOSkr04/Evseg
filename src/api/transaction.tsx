import { ITransaction } from "../interface/transaction";
import { Result } from "../models/result";
import { Transaction } from "../models/transaction";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getTransactions = async ({id, page, }: {id: string, page?: number}) => {
  const {data} = await httpRequest.get(`/transaction/${id}`, {  sort: "-createdAt",limit:50});
  return data
};

