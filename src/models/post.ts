import { IPost } from "../interface/post";
import { ScopedMutator } from "swr/_internal";
export class Post implements IPost {
  _id: string;
  title: string;
  like: number;
  comment: number;
  createUser: string;
  isLiked: boolean;
  createdAt: string;
  name: string;
  photo?: string;
  constructor({
    _id,
    title,
    like,
    comment,
    createUser,
    isLiked,
    createdAt,
    name,
    photo
  }: IPost) {
    this._id = _id;
    this.title = title;
    this.like = like;
    this.comment = comment;
    this.createUser = createUser;
    this.isLiked = isLiked;
    this.createdAt = createdAt;
    this.name = name;
    this.photo = photo;
  }

  setLike({ mutate , likeCount, }: {mutate: ScopedMutator<any>, likeCount:number,}) {
      this.like = likeCount + 1;
      this.isLiked = true;
    mutate(`post.${this._id}`, Post.fromJson(this), { revalidate: false });
    return this;
  }
  setComment({ mutate , commentCount, }: {mutate: ScopedMutator<any>, commentCount:number,}) {
      this.comment = commentCount + 1;
    mutate(`post.${this._id}`, Post.fromJson(this), { revalidate: false });
    return this;
  }

  setUnlike({ mutate, likeCount }: {mutate: ScopedMutator<any>, likeCount: number}){
    this.like = likeCount - 1;
    this.isLiked = false;
    mutate(`post.${this._id}`, Post.fromJson(this), { revalidate: false });
    return this;
  }

  

  static fromJson(json: IPost) {
    return new Post(json);
  }
}
