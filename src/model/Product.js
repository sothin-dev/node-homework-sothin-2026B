import { BaseModel } from "./BaseModel.js";

export class Product extends BaseModel {
    static get table() {
        return "products";
    }

    static get fillable() {
        return ["name", "price"];
    }

    static async create(data) {
        return super.create(data);
    }

    static async update(id, data) {
        return super.update(id, data);
    }
}
