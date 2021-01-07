const {User} = require('../models')
const cekPass = require('../helper/cekPass')
const generateToken = require('../helper/generateToken')

class Controller{
    static register (req, res, next){
        let body = req.body
        let data = {
            email: body.email,
            password: body.password
        }
        User.create(data)
        .then(data=>{
            res.status(200).json({id:data.id, email:data.email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login (req, res, next){
        let body = req.body
        let dataUser = {
            email: body.email,
            password: body.password
        }

        User.findOne({where:{email: dataUser.email}})
        .then(data=>{
            if(!data){
                res.status(401).json({message: 'Email/Password incorect'})
            }else{
                let cekPassword = cekPass(dataUser.password, data.password)
                if(cekPassword){
                    let payload = {id: data.id, email: data.email}
                    let access_token = generateToken(payload)
                    return res.status(200).json({id: data.id, email: data.email, access_token})
                }else{
                    res.status(401).json({message: 'Email/Password incorrect'})
                }
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = Controller