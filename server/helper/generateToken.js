const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

module.exports = generateToken