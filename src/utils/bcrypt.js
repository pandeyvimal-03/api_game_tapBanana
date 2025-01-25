import bcrypt from 'bcryptjs'


export const encodePass = async(password)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const encodedPassword = await bcrypt.hash(password , salt)
        return Promise.resolve(encodedPassword);
    } catch (error) {
       return Promise.reject(false)
    }
}

export const verifyPass = async(savedPass , enteredPass)=>{
    try {   
        const isValid =  await bcrypt.compare(enteredPass , savedPass)
        return isValid
    } catch (error) {
        return false
    }
}