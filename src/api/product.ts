import { IProduct } from "../interface/product";
import { Product } from "../models/product";
import { Result } from "../models/result";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getProducts = async ({ page, limit }: {page: number, limit:number}) => {
  const { count, data } = await httpRequest.get("/products", { page: page, limit: limit, sort: "-createdAt" });
  return new Result<IProduct>({
    data: data.map((row: IProduct) => Product.fromJson(row)),
    count
  });
};

export const getProduct = async (id: string) => {
  const res = await httpRequest.get(`/products/${id}`);
  return Product.fromJson(res.data)
};

export const addProduct = async (id: string) => {
  const res = await httpRequest.post(`/baskets/${id}`);
  return Product.fromJson(res.data);
};


