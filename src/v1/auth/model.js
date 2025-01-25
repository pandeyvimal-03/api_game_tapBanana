import mongoose , {Schema} from "mongoose";

const UserSchema = new Schema({
     USERNAME : {
        type : String,
        required : true
     },
     EMAIL : {
        type : String,
        required : true
     },
     PASSWORD : {
        type : String,
        required : true
     },
     ROLE : {
        type : String,
        default : 'user'
     },
    ROLEID : {
        type : Number,
        default : 2
    },
    STATUS : {
        type : Number,
        default : 1
    },
    CLICK_COUNT : {
        type : Number,
        default : 0
    },
    CREATED_ON : {
        type : Date,
        default : new Date()
    }
})

export const User = mongoose.model('User' , UserSchema)
