const {Client} = require('pg')
var connection;


module.exports = {
    getConnection: function () {
        return connection
    },
    createConnection: function (){
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'B2B-DB',
            password: 'qwer1234',
            port: 10003,
        })

        connection = client.connect()

        return connection
    }
}




