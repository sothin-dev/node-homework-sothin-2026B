import { User } from "../model/User.js";
import { baseController } from "./baseController.js";

export class UserController extends baseController {

    /**
     * name: index
     * @param {req, res}
     * dsc: get all users as list
     */
    async index(req, res) {
        try {
            const users = await User.getAll();
            this.success(res, "List of users", users)
        } catch (err) {
            this.error(res, 500, "Internal Server Error")
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
                this.error(res, 404, "User not found")
            }

            this.success(res, "user data", user)
        } catch (err) {
            this.error(res, 500, "Internal server error")
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

        // ❌ MUST return
        if (!name) {
            return this.error(res, 400, "Name is required!");
        }

        const result = await User.create({ name });

        const user = {
            id: result.insertId,
            name: name
        };

        return this.success(res, "User created", user, 201);

    } catch (err) {
        return this.error(res, 500, "Internal server error");
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
            return this.error(res, 400, "Name is required!");
        }

        const user = await User.findById(id);

        if (!user) {
            return this.error(res, 404, "User not found");
        }

        await User.update(id, { name });

        return this.success(res, "User updated", {
            id,
            name
        });

    } catch (err) {
        return this.error(res, 500, "Internal server error");
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
                this.error(res, 404, "User not found")
            }

            await User.delete(id);

            this.success(res, "user is deleted", null)

        } catch (err) {
            this.error(res, 500, "Internal server error")
        }
    }
}
