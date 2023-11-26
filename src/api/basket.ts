import { IPost } from './../interface/post';
import { HttpRequest } from "../helper";
import { Post } from '../models/post';
import { Result } from '../models/result';
import { IProduct } from '../interface/product';

const httpRequest = new HttpRequest();

export const getBaskets = async ({ page, limit }: { page: number, limit: number }) => {
    const {  data } = await httpRequest.get("/baskets", { page: page, limit: limit, sort: "-createdAt" });
    return data
}

export const addBasket = async (data: {quantity: number, productId: string, size: string}) => {
    console.log(data, "a")
    const res = await httpRequest.post("/baskets", data);
    return res;
}

export const login = async (data: { phone: string, password: string }) => {
    const res = await httpRequest.post("/users/login", data);
    return res;
  };