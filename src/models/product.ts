import { IProduct } from "../interface/product";
import { ScopedMutator } from "swr/_internal";
export class Product implements IProduct {
  _id: string;
  name: string
  price: number
  description: string
  size: string[]
  color: string[]
  available: {
    type: boolean
  };
  availableCount: number
  image: {
    blurHash: string
    url: string
  };
  images: [
    {
      blurHash: string
      url: string
    },
  ];
  category:string
  constructor({
    _id,
    name,
    price,
    description,
    size,
    color,
    available,
    availableCount,
    image,
    images,
    category
  }: IProduct) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.size = size;
    this.color = color;
    this.available = available;
    this.availableCount = availableCount;

    this.image = image;
    this.images= images;
    this.category= category;
  }  

  static fromJson(json: IProduct) {
    return new Product(json);
  }
}
