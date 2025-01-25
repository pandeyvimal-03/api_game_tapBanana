import { User } from "./model.js";
import { encodePass, verifyPass } from "../../utils/bcrypt.js";
import { createToken } from "../../utils/jwt.js";

export const login = async (body) => {
    try {
        const { email, password } = body
        const user = await User.findOne({ EMAIL: email })
        if (!user) {
            throw new Error("Invalid Credential")
        }

        if (!verifyPass(user.PASSWORD, password)) {
            throw new Error("Invalid Credential")
        }
        else {
            const token = createToken({ username: user.USERNAME, userRole: user.ROLE, userRoleId: user.ROLEID, id: user._id })
            let det =   {username : user.USERNAME , email : user.EMAIL , userRole : user.ROLE , userRoleId : user.ROLEID , userId : user._id }
            return Promise.resolve({ token: token, user_detail: det })
        }

    } catch (error) {
        return Promise.reject(error)
    }
}


export const register = async (body) => {
    const { username, email, password } = body
    try {
        let user = await User.findOne({ EMAIL: email })
        if (user) {
             return Promise.reject("user with this email already exists")
        }
        let hashed = await encodePass(password)
        if (!hashed) {
            throw new Error("Internal Error")
        }
        let newUser = new User({ USERNAME: username, EMAIL: email, PASSWORD: hashed, ROLEID: 2, ROLE: 'user' })
        await newUser.save()
        let users = await User.find().sort({CREATED_ON : -1})
        return Promise.resolve(users)
    } catch (error) {
        return Promise.reject(error)
    }
}


export const updateUser = async (body) => {
    try {
        const { player_id, userRoleId, userRole, username, email, status } = body
        console.log("id : " , player_id)
       const updated =  await User.findByIdAndUpdate(player_id , { $set: { USERNAME: username, EMAIL: email, STATUS: status } } , { new: true })
       console.log("updated is : ", updated)
        const userList = await User.find().sort({ CREATED_ON: -1 })
        return Promise.resolve(userList)
    } catch (error) {
        return Promise.reject(error)
    }
}


export const userList = async () => {
    try {
        const list = await User.find().sort({ CREATED_ON: -1 })
        return Promise.resolve(list)
    } catch (error) {
        return Promise.reject(error)
    }

}


export const clickCount = async(body)=>{
    try {
        const {id} = body
        console.log("id is : ", id)
        const user_data = await User.findById(id)
        return Promise.resolve(user_data)
    } catch (error) {
        return Promise.reject(error)
    }
}