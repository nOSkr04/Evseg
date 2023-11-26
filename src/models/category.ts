import { ICategory } from "../interface/category";
import { BaseModel } from "./base-model";

export class Category extends BaseModel implements ICategory{
    parent: string; 
    name: string;
    id: string;
    constructor({
        parent,
        id,
        name,
    } : ICategory) {
        super();
        this.id = id;
        this.name = name;
        this.parent = parent;
    }
}