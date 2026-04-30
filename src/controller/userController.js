import { User } from "../model/user.js";

export class UserController {

    /**
     * name: index
     * @param {req, res}
     * dsc: get all users as list
     */
    async index(req, res) {
        try {
            const users = await User.getAll();
            res.status(200).json({
                success: true,
                message: "Get all user",
                data: users
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    /**
     * name: show
     * @param {*} req : request
     * @param {*} res : respond
     * @returns 
     * dsc: show detail information for a user by id
     */
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

    /**
     * name: store
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * dsc: create a user with name.
     */
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

    /**
     * name: update
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * dsc: update user with name
     */
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

    /**
     * name: delete
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * dsc: delete user from recode
     */
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
