const bcrypt = require('bcrypt')

function hashPassword(pass){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}

module.exports = hashPassword