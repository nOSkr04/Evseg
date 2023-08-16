import { ICommentData } from "../components/post/post-input";
import { IPost } from "../interface/post";
import { Comment } from "../models/comment";
import { Post } from "../models/post";
import { Result } from "../models/result";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getPosts = async ({ page, limit }: {page: number, limit:number}) => {
  const { count, data } = await httpRequest.get("/posts", { page: page, limit: limit, sort: "-createdAt" });
  return new Result<IPost>({
    data: data.map((row: IPost) => Post.fromJson(row)),
    count
  });
};

export const postNewsFeed = async ({ title }: {title: string}) => {
  const res = await httpRequest.post("/posts", { title: title });
  return res;
};

export const postPhotoUpload = async ({ id, data }: {id: string, data:FormData}) => {
  const res = await httpRequest.uploadImage(`/posts/${id}/photo`, data as unknown as {file: Blob});
  return res;
};
export const getPost = async (id: string) => {
  const res = await httpRequest.get(`/posts/${id}`);
  return Post.fromJson(res.data);
};

export const postLike = async (id: string) => {
  const res = await httpRequest.post(`/likes/${id}`);
  return res;
};
export const postUnLike = async (id: string) => {
  const res = await httpRequest.del(`/likes/${id}`);
  return res;
};

export const postLikes = async (id: string) => {
  const res = await httpRequest.get(`/likes/${id}/posts`);
  return res;
};

export const getComments = async (id: string) => {
  const res = await httpRequest.get(`/comments/${id}/post`, { sort: "-createdAt" });
  return res.data;
};

export const postComment = async ({ id, values } : {id: string, values: ICommentData}) => {
  const res = await httpRequest.post(`/comments/${id}`, values );
  return Comment.fromJson(res.data);
};



// /comments/${id}/post?sort=-createdAt