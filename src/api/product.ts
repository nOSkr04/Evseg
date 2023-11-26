import { IProduct } from "../interface/product";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { Result } from "../models/result";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getProducts = async ({ page, limit, categoryId, subCategoryId }: {page: number, limit:number, categoryId: string, subCategoryId?: string}) => {
  const category = categoryId !== '' ? `/category=${categoryId}` : ''
  const subCategory = subCategoryId !== undefined ? `/subCategory=${subCategoryId}` : ''
  const { count, data } = await httpRequest.get(`/products${category}${subCategory}`, { page: page, limit: limit, sort: "-createdAt" });
  return new Result<IProduct>({
    data: data.map((row: IProduct) => Product.fromJson(row)),
    count
  });
};

export const getProduct = async (id: string, filterId: string) => {
  const selected = filterId ? filterId : id;
  const res = await httpRequest.get(`/products/${id}`);
  return Product.fromJson(res.data)
};

export const addProduct = async (id: string) => {
  const res = await httpRequest.post(`/baskets/${id}`);
  return Product.fromJson(res.data);
};

export const category = async ({page, limit} : {page: number, limit: number}) => {
  const res = await httpRequest.get(`/categories`, {page: page, limit: limit, sort: '-createdAt'});
  return res
}


