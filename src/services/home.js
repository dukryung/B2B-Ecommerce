const parse = require("../utils/parse");
const home = new Object();
home.read = async function (req, res) {
    try {
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}