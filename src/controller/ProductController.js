import { Product } from "../model/Product.js";
import { baseController } from "./baseController.js";

export class ProductController extends baseController {
    async index(req, res) {
        try {
            const products = await Product.getAll();
            this.success(res, "List of products", products);
        } catch (err) {
            this.error(res, 500, "Internal Server Error");
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                return this.error(res, 404, "Product not found");
            }

            this.success(res, "product data", product);
        } catch (err) {
            this.error(res, 500, "Internal server error");
        }
    }

    async store(req, res) {
        try {
            const { name, price } = req.body;

            if (!name || price === undefined) {
                return this.error(res, 400, "Name and price are required!");
            }

            const result = await Product.create({ name, price });
            const product = {
                id: result.insertId,
                name,
                price
            };

            this.success(res, "product created", product, 201);
        } catch (err) {
            this.error(res, 500, "Internal server error");
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price } = req.body;

            if (!name && price === undefined) {
                return this.error(res, 400, "Name or price is required!");
            }

            const product = await Product.findById(id);

            if (!product) {
                return this.error(res, 404, "Product not found");
            }

            await Product.update(id, { name, price });

            this.success(res, "product updated", {
                ...product,
                name: name ?? product.name,
                price: price ?? product.price
            });
        } catch (err) {
            this.error(res, 500, "Internal server error");
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                return this.error(res, 404, "Product not found");
            }

            await Product.delete(id);

            this.success(res, "product is deleted", null);
        } catch (err) {
            this.error(res, 500, "Internal server error");
        }
    }
}
