const {Pool} = require('pg')


module.exports.getPool = async () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'B2B-DB',
        password: 'qwer1234',
        port: 10003,
    })

    await pool.connect();
    return pool;
}




