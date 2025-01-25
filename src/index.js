import express from 'express'
import http from 'http'
import config from './config.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { dbinit } from './db/connect.js'
import authRouter from './v1/auth/routes.js'
import { initSocket } from './v1/socket/event.js'


const app = express()
const server = http.createServer(app)

const io = new Server(server , {
    cors : {
        origin : '*',
    }
})

initSocket(io)
app.use(cors())
app.use(express.json())
dbinit()

app.get('/' , (req , res)=>{
     res.send("server is running fine")
})
app.use('/v1' , authRouter)

const PORT = config.port || 5022;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});