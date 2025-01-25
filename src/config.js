import dotenv from 'dotenv'
dotenv.config()

export default {
    port : process.env.PORT,
    // db_url  : `mongodb://127.0.0.1:27017/bcountDB`,
    db_url : `mongodb+srv://vimal_pandey:khiladi786@cluster0.ci4jp.mongodb.net/bcountDB`,
    secret_key : process.env.SECRET_KEY
}