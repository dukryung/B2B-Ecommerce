const user = new Object();
const db = new Object();
const form = {
    success: null,
    message: null,
    data: null,
}

user.init = function (pool) {
    db.pool = pool
}

user.getUsers = async function (req, res) {
    var result = new Object(form)
    try {
        const data = await db.pool.query('SELECT (id, name, attribute, authority, grade) FROM users')
        result.success = true
        result.data = data.rows
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        result.success = false
        result.message = e.toString()
        res.status(505).json(result)
    }
}

user.getUserById = async function (req, res) {
    res.send("get User By Name!!!")
}
user.getUserByName = async function (req, res) {
    res.send("get User By Name!!!")
}
user.updateUser = async function (req, res) {
    res.send("get Users!!!")
}
user.insertUser = async function (req, res) {
    try {
        await db.connection.query('INSERT INTO users (name, attribute,authority) VALUES ($1, $2,$3) RETURNING *', [req.body.name, req.body.attribute, req.body.authority])
        res.status(200).send(`insert Users`)
    } catch (e) {
        console.error(e)
        res.status(505).send(`failed to insert user's data`)
    }
}
user.deleteUser = async function (req, res) {
    res.send("get Users!!!")
}

module.exports = user


