import { IImage } from "../interface/image";
import { IProduct } from "../interface/product";
import { ScopedMutator } from "swr/_internal";
export class Product implements IProduct {
  _id: string;
  name: string
  price: number
  description: string
  quantity: number;
  size: {
    name: string, 
    quantity: number,
  }
  color: string
  available: boolean
  availableCount: number
  image: IImage;
  images: [
    IImage,
  ];
  category: {
    __v: string,
    name: string,
    id: string,
  }
  productId: string;
  constructor({
    productId,
    quantity,
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
    this.productId = productId;
    this.quantity = quantity;
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
