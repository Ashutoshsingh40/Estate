import mongoose from "mongoose";
const messageSchema =new mongoose.Schema({
    listingId:
    {
            type:String,
            required:true
    },
    thirdParty:
    {
        type:String,
        required:true,
        unique:true
    },
    name:
    {
        type:String
    },
    messagebox:[
        {
           type:String 
        }
    ]
},{timestamps:true});
export const Message=mongoose.model('Message',messageSchema)