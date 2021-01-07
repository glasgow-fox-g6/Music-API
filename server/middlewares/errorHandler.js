const errorHandler = 
(err, req, res, next)=>{
    switch(err.name){
        case 'SequelizeValidationError':
            let errorMessage = err.errors.map(err=>{
                return{
                    message: err.message,
                    column: err.path
                }
            });
            res.status(400).json(errorMessage)
            break
            
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({message:'Email telah digunakan'})
            break 

        case 'NotFound':
            res.status(404).json({message:'not found'})
            break 

        case 'Unauthorized':
            res.status(401).json({message: "Sorry you don't have permision"})
            break

        case 'Email/Password incorrect':
            res.status(401).json({message: "Email/Password incorrect"})
            break

        case 'Forbidden':
            res.status(403).json({message: "Log in first"})
            break

        default:
            res.status(500).json({message: 'Internal Server Error'})
    }
}
module.exports = errorHandler