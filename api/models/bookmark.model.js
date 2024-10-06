import mongoose from "mongoose";
const bookmarkSchema=new mongoose.Schema({
    userId:
    {
        type:String,
        required:true
    },
    list:[
        {
            type:String,
        }
    ]
},{timestamps:true})
 export const bookmark =mongoose.model('bookmark',bookmarkSchema)