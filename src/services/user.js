const db = require('../utils/database')
const {response} = require("express");

const user = new Object();
var connection = db.getConnection()


user.getUsers = async function (req, res) {

    res.send("get Users!!!")
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
    console.log("insert User Data")
    var name = 'dukryung'
    var attribute = 1
    var authority = 1
    try {
        connection.query('INSERT INTO users (name, attribute,authority) VALUES ($1, $2,$3) RETURNING *', [name, attribute, authority])
        response.status(200).send(`insert Users`)
    } catch (error) {
        console.error(error.stack)
        response.status(505).send(`failed to insert user's data`)
    }
}
user.deleteUser = async function (req, res) {
    res.send("get Users!!!")
}


module.exports = user


