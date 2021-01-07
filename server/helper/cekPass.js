const bcrypt = require('bcrypt')

function cekPass (pass, dbPass){
    return bcrypt.compareSync(pass,dbPass)
}

module.exports = cekPass