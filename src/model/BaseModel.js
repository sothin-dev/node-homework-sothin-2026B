import db from "../config/database.js";

export class BaseModel {
    constructor() {
        if (new.target === BaseModel) {
            throw new Error("Cannot create BaseModel directly");
        }
    }

    static get table() {
        throw new Error("table must be implemented");
    }

    static get fillable() {
        return [];
    }

    static checkTable() {
        if (!this.table) {
            throw new Error("table must be implemented");
        }
    }

    static filterData(data) {
        const result = {};

        for (const field of this.fillable) {
            if (data[field] !== undefined) {
                result[field] = data[field];
            }
        }

        return result;
    }

    static async getAll() {
        this.checkTable();

        const sql = `select * from ${this.table}`;
        const [rows] = await db.query(sql);
        return rows;
    }

    static async findById(id) {
        this.checkTable();

        const sql = `select * from ${this.table} where id = ?`;
        const [rows] = await db.query(sql, [id]);
        return rows[0] ?? null;
    }

    static async create(data) {
        this.checkTable();

        const values = this.filterData(data);
        const fields = Object.keys(values);

        if (fields.length === 0) {
            throw new Error("No data to create");
        }

        const placeholders = fields.map(() => "?").join(", ");
        const sql = `insert into ${this.table} (${fields.join(", ")}) values (${placeholders})`;
        const [result] = await db.query(sql, Object.values(values));
        return result;
    }

    static async update(id, data) {
        this.checkTable();

        const values = this.filterData(data);
        const fields = Object.keys(values);

        if (fields.length === 0) {
            throw new Error("No data to update");
        }

        const setSql = fields.map((field) => `${field} = ?`).join(", ");
        const sql = `update ${this.table} set ${setSql} where id = ?`;
        const [result] = await db.query(sql, [...Object.values(values), id]);
        return result;
    }

    static async delete(id) {
        this.checkTable();

        const sql = `delete from ${this.table} where id = ?`;
        const [result] = await db.query(sql, [id]);
        return result;
    }
}
