import { IPost } from './../interface/post';
import { HttpRequest } from "../helper";
import { Post } from '../models/post';
import { Result } from '../models/result';

const httpRequest = new HttpRequest(); 

export const getBaskets = async ({page, limit} : {page: number, limit: number}) => {
    const {count ,data} = await httpRequest.get("/baskets", {page: page, limit: limit, sort: "-createdAt"});
    return new Result<IPost>({
        data: data.map((row: IPost) => Post.fromJson(row)),
        count,
    })
}