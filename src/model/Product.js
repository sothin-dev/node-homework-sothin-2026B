import db from "../config/database.js";
import { BaseModel } from "./BaseModel.js";

export class Product extends BaseModel {

    static get table() {
        return "products";
    }

    static get fillable() {
        return ["name", "price"];
    }

    static async getAll() {
        const sql = `SELECT * FROM ${this.table}`;
        const [rows] = await db.query(sql);
        return rows;
    }

    static async findById(id) {
        const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
        const [rows] = await db.query(sql, [id]);
        return rows[0] ?? null;
    }

    static async create(data) {
        const values = this.filterData(data);
        const fields = Object.keys(values);

        if (fields.length === 0) {
            throw new Error("No data to create");
        }

        const placeholders = fields.map(() => "?").join(", ");

        const sql = `
            INSERT INTO ${this.table} (${fields.join(", ")})
            VALUES (${placeholders})
        `;

        const [result] = await db.query(sql, Object.values(values));
        return result;
    }

    static async update(id, data) {
        const values = this.filterData(data);
        const fields = Object.keys(values);

        if (fields.length === 0) {
            throw new Error("No data to update");
        }

        const setSql = fields.map(f => `${f} = ?`).join(", ");

        const sql = `
            UPDATE ${this.table}
            SET ${setSql}
            WHERE id = ?
        `;

        const [result] = await db.query(sql, [...Object.values(values), id]);
        return result;
    }

    static async delete(id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ?`;
        const [result] = await db.query(sql, [id]);
        return result;
    }
}