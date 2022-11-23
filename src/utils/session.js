module.exports.checkSession = function (req, res, next) {
    console.log('LOGGED');
    const email = req.body.email
    try {

        next();
    } catch (e) {

    }
}