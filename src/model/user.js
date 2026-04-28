import db from "../config/database.js";

export class User {
    static async getAll() {
        const sql = "select * from users";
        const [rows] = await db.query(sql);
        return rows;
    }

    /**
     * name: create
     * @param: {*} callback, name
     * Create user with name
     */
    static async create(name) {
        const sql = "insert into users (name) values(?)";
        const [result] = await db.query(sql, [name]);
        return result;
    }

    /**
     * name: update
     * @param {*} id 
     * @param {*} name 
     * @param {*} callback 
     * use for update user data
     */
    static async update(id, name) {
        const sql = "update users set name = ? where id = ?";
        const [result] = await db.query(sql, [name, id]);
        return result;
    }

    /**
     * name: delete
     * @param {*} id 
     * @param {*} callback 
     * use for delete user
     */
    static async delete(id) {
        const sql = "delete from users where id = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    }

    /**
     * name: find
     * @param {*} id 
     * @param {*} callback 
     * filter a user 
     */
    static async findById(id) {
        const sql = "select * from users where id = ?";
        const [rows] = await db.query(sql, [id]);
        return rows[0] ?? null;
    }
}
