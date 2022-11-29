const bcrypt = require('bcrypt');
const crypto = new Object();


crypto.createHash = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return {hashed_value: hashedValue, salt: salt}
}

crypto.compareHash = async (value, valueHashed) => {
    return await bcrypt.compare(value, valueHashed)
}

module.exports = crypto