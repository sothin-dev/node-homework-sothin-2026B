import { User } from "../model/user.js";

export class UserController {

    async index(req, res) {
        try {
            const users = await User.getAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    async store(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "Name is required"
                });
            }

            const result = await User.create(name);

            res.status(201).json({
                message: "Created successfully",
                data: {
                    id: result.insertId,
                    name
                }
            });

        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "Name is required"
                });
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            await User.update(id, name);

            res.status(200).json({
                message: "Updated successfully",
                data: { id, name }
            });

        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            await User.delete(id);

            res.status(200).json({
                message: "Deleted successfully"
            });

        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }
}
