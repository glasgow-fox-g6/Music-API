const {OAuth2Client} = require('google-auth-library')
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
                next({name:'Email/Password incorrect'})
            }else{
                let cekPassword = cekPass(dataUser.password, data.password)
                if(cekPassword){
                    let payload = {id: data.id, email: data.email}
                    let access_token = generateToken(payload)
                    return res.status(200).json({id: data.id, email: data.email, access_token})
                }else{
                    next({name:'Email/Password incorrect'})
                }
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static loginGoogle(req, res, next){
        let email= null
        let id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            email = payload.email
            return User.findOne({where:{email}})
        })
        .then(data=>{
            if(!data){
                return User.create({
                    email,
                    password: "12345678"
                })
            }else{
                return data
            }
        })
        .then(data=>{
            let payload = {id: data.id, email: data.email}
            let access_token = generateToken(payload)
            return res.status(200).json({id: data.id, email: data.email, access_token})
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })   
    }
}

module.exports = Controller