import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json())
/**
 * Database connection
 */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "homework-node-sothin"
})

db.connect(err => {
    if (err) {
        console.log('DB err: ', err)
    } else {
        console.log("MySQL connected")
    }
})


/**
 * Get all users
 */
app.get('/users', (req, res) => {
    const sql = "select * from users"
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(200).json(result)
    })
})

/**
 * Create user
 */
app.post('/users', (req, res) => {
    const {name} = req.body;

    const sql = "INSERT INTO users (name) VALUES(?)";
    db.query(sql, [name], (err, result) => {
        if(err) return res.status(500).json(err);
        res.status(201).json({
            'message' : 'Create Sucessfully',
            'data' : {
                'id': result.insertId,
                'name': name
            }
        })
    })
})

/**
 * update user
 */
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // first check user exists
    const checkSql = "SELECT * FROM users WHERE id = ?";

    db.query(checkSql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // update user
        const updateSql = "UPDATE users SET name = ? WHERE id = ?";

        db.query(updateSql, [name, id], (err, updateResult) => {
            if (err) return res.status(500).json(err);

            res.status(200).json({
                message: "User updated successfully",
                data: {
                    id,
                    name
                }
            });
        });
    });
});

/**
 * delete user
 */
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    });
});




/**
 * Start server
 */
app.listen(3000, () => {
    console.log('Server running on port 3000')
})