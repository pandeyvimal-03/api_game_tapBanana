import JWT from 'jsonwebtoken'
import config from '../config.js'
import { resFormat } from './resFormat.js'
import { apiStatus } from '../constant.js'



export const createToken = (payload)=>{
    try {
     const token =  JWT.sign(payload , config.secret_key)
     return token
    } catch (error) {
        console.log(error)
        return false
    }
}

export const  verifyToken = (req , res , next)=>{
    const author = req.headers['authorization']
    if(author){
        const token = author.split(' ')[1]
        const payload =  JWT.verify(token , config.secret_key)
          if(payload){

              req.username  = payload.username
              req.body.id = payload.id,
              req.body.userRoleId = payload.userRoleId
              req.body.userRole = payload.userRole
              next();
          }
          else{
              res.status(403).send(resFormat({status : apiStatus.failed , error : 'unauthorized user'}))
          }
    }
    else{
      res.status(403).send(resFormat({status : apiStatus.failed , error : 'unauthorized user'}))
    }
}

export const adminTokenVerify = (req , res , next)=>{
    const author = req.headers['authorization']
    console.log("autor" , author)
      if(author){
          const token = author.split(' ')[1]
           console.log("token : ", token)
          const payload =  JWT.verify(token , config.secret_key)
          console.log("payload : ", payload)
            if(payload && payload.userRoleId == 1){
                req.body.id = payload.id,
                req.body.userRoleId = payload.userRoleId
                req.body.userRole = payload.userRole
                next();
            }
            else{
                res.status(403).send(resFormat({status : apiStatus.failed , error : 'unauthorized user'}))
            }
      }
      else{
        res.status(403).send(resFormat({status : apiStatus.failed , error : 'unauthorized user'}))
      }
}

export const verifysocket = (socket , next)=>{
    const author = socket.handshake.auth.token;
    
    if (!author) {
      return next(new Error("Unauthorized: No token provided"));
    }
    const token = author.split(" ")[1]
    JWT.verify(token, config.secret_key, (err, decoded) => {
      if (err) {
        return next(new Error("Unauthorized: Invalid token"));
      }
         socket.user = decoded
      next(); 
    });
}