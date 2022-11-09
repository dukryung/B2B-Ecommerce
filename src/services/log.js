const log = new Object();
const db = new Object();
const form = {
    success: null,
    message: null,
    data: null,
}

log.init = function (connectionDB) {
    db.connection = connectionDB
}

log.getDealLogById = async function (req, res) {
    var result = new Object(form)
    const id = req.params.id
    try {
        await db.connection.query('select (id,type,trade_id) from deal_log where user_id = $1)', [id], (error, results)=>{
            result.success = true
            result.code = 200
            result.data = results.rows

            res.status(200).json(result)
        })


    } catch (e) {
        console.error(e)
    }
}

module.exports = log