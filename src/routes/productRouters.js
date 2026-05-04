import express from "express";
import { ProductController } from "../controller/ProductController.js";

const router = express.Router();
const controller = new ProductController();

router.get("/products", (req, res) => controller.index(req, res));
router.get("/products/:id", (req, res) => controller.show(req, res));
router.post("/products", (req, res) => controller.store(req, res));
router.put("/products/:id", (req, res) => controller.update(req, res));
router.delete("/products/:id", (req, res) => controller.delete(req, res));

export default router;
