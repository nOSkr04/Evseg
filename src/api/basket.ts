import { IProduct } from "../interface/product";
import { Product } from "../models/product";
import { Result } from "../models/result";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getBaskets = async ({ page, limit }: { page: number, limit: number }) => {
    const  data  = await httpRequest.get("/baskets", { page: page, limit: limit, sort: "-createdAt" });
    return data;
}

export const addBasket = async (data: {quantity: number, productId: string, size: string}) => {
    const res = await httpRequest.post("/baskets", data);
    return res;
}

export const login = async (data: { phone: string, password: string }) => {
    const res = await httpRequest.post("/users/login", data);
    return res;
  };