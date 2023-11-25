import { IImage } from "../interface/image";
import { BaseModel } from "./base-model";

export class Image extends BaseModel implements IImage {
    url: string;
    blurHash: string;
    _id: string;
    constructor({
        _id,
        url,
        blurHash,
    }: IImage) {
        super();
        this._id = _id;
        this.url = url;
        this.blurHash = blurHash;
    }
}