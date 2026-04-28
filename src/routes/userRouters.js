import express from 'express';
import { UserController } from '../controller/userController.js';

const router = express.Router();
const controller = new UserController();



router.get('/users', (req, res) => controller.index(req, res));
router.get('/users/:id', (req, res) => controller.show(req, res));
router.post('/users', (req, res) => controller.store(req, res));
router.put('/users/:id', (req, res) => controller.update(req, res));
router.delete('/users/:id', (req, res) => controller.delete(req, res));

export default router;
