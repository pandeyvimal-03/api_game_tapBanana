import express from 'express'
import { resFormat } from '../../utils/resFormat.js'
import { login , register , updateUser , userList , clickCount} from './controller.js'
import { apiStatus } from '../../constant.js'
import { verifyToken, adminTokenVerify } from '../../utils/jwt.js'
const authRouter = express.Router()


authRouter.post('/login' , (req , res)=>{
    login(req.body)
      .then((result)=>{
          res.send(resFormat({result , status : apiStatus.success}))
      })
      .catch((error)=>{
         res.send(resFormat({error , status : apiStatus.failed}))
      })
})

authRouter.post('/create_user' , adminTokenVerify , (req , res)=>{
    register(req.body)
      .then((result)=>{
          res.send(resFormat({result : result , status : apiStatus.success}))
      })
      .catch((error)=>{
         res.send(resFormat({error : error , status : apiStatus.failed}))
      })
})

authRouter.get('/userList' , verifyToken , (req , res)=>{
    userList(req.body)
    .then((result)=>{
        res.send(resFormat({result , status : apiStatus.success}))
    })
    .catch((error)=>{
       res.send(resFormat({error , status : apiStatus.failed}))
    })
})

authRouter.put('/update_user' , adminTokenVerify , (req , res)=>{
    updateUser(req.body)
    .then((result)=>{
        res.send(resFormat({result , status : apiStatus.success}))
    })
    .catch((error)=>{
       res.send(resFormat({error , status : apiStatus.failed}))
    })
})

authRouter.get("/get_count" , verifyToken , (req , res)=>{
    clickCount(req.body)
    .then((result)=>{
        res.send(resFormat({result , status : apiStatus.success}))
    })
    .catch((error)=>{
       res.send(resFormat({error , status : apiStatus.failed}))
    })
})

export default authRouter;