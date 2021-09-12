const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.hash_key = async (value) => {
    const salt = await bcrypt.genSalt(10);
    const hashedvalue = await bcrypt.hash(value, salt);
    return hashedvalue;
};

exports.sign_token = async (param) => {    
    const { value, expiry = '1h' } = param;
    const token = jwt.sign({  data: value }, process.env.secret, { expiresIn: expiry });
    return token;
}

exports.compare = async (val1, val2) => {
    const validPass = await bcrypt.compare(
        val1,
        val2
    );
    return validPass;
}