const parse = new Object()

const userForm = {
    id: null,
    name: null,
    attribute: null,
    authority: null,
    grade: null
}


parse.reqUserBody = function (reqBody) {
    let body = new Object(userForm)
    if (reqBody.id !== undefined && reqBody.id !== null) {
        body.id = reqBody.id
    }
    if (reqBody.name !== undefined && reqBody.name !== null) {
        body.name = reqBody.name
    }
    if (reqBody.attribute !== undefined && reqBody.attribute !== null) {
        body.attribute = reqBody.attribute
    }
    if (reqBody.authority !== undefined && reqBody.authority !== null) {
        body.authority = reqBody.authority
    }
    if (reqBody.grade !== undefined && reqBody.grade !== null) {
        body.grade = reqBody.grade
    }
    return body
}

const logForm = {
    id : null,
    user_id : null,
    type : null,
    trander_id : null
}

parse.reqLogBody = function (reqBody) {
    let body = new Object(logForm)

   if (reqBody.id !== undefined && reqBody.id !== null) {
        body.id = reqBody.id
    }
    if (reqBody.user_id !== undefined && reqBody.user_id !== null) {
        body.user_id = reqBody.user_id
    }
    if (reqBody.type !== undefined && reqBody.type !== null) {
        body.type = reqBody.type
    }
    if (reqBody.trander_id !== undefined && reqBody.trander_id !== null) {
        body.trander_id = reqBody.trander_id
    }

    return body
}

const productForm = {
    id : null,
    user_id : null,
    name : null,
    amount : null,
    location : null
}

parse.reqProductBody = function (reqBody) {
    let body = new Object(productForm)

    if (reqBody.id !== undefined && reqBody.id !== null) {
        body.id = reqBody.id
    }
    if (reqBody.user_id !== undefined && reqBody.user_id !== null) {
        body.user_id = reqBody.user_id
    }
    if (reqBody.name !== undefined && reqBody.name !== null) {
        body.name = reqBody.name
    }
    if (reqBody.amount !== undefined && reqBody.amount !== null) {
        body.amount = reqBody.amount
    }
    if (reqBody.location !== undefined && reqBody.location !== null) {
        body.location = reqBody.location
    }

    return body
}

const form = {
    success: null,
    message: null,
    data: null,
}

parse.resBody = function (success, message, rows) {
    let body = new Object(form)

    if (!success) {
        body.success = false
        body.message = message
        return body
    }
    body.success = success
    body.data = rows
    return body
}

module.exports = parse