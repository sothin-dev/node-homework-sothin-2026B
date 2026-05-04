import { BaseModel } from "./BaseModel.js";

export class User extends BaseModel {
    static get table() {
        return "users";
    }

    static get fillable() {
        return ["name"];
    }

    static async getAll() {
        return super.getAll();
    }

    /**
     * name: create
     * @param: {*} callback, name
     * Create user with name
     */
    static async create(name) {
        return super.create({ name });
    }

    /**
     * name: update
     * @param {*} id 
     * @param {*} name 
     * @param {*} callback 
     * use for update user data
     */
    static async update(id, name) {
        return super.update(id, { name });
    }

    /**
     * name: delete
     * @param {*} id 
     * @param {*} callback 
     * use for delete user
     */
    static async delete(id) {
        return super.delete(id);
    }

    /**
     * name: find
     * @param {*} id 
     * @param {*} callback 
     * filter a user 
     */
    static async findById(id) {
        return super.findById(id);
    }
}
