import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
        require:true, 
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.model('Todo',todoSchema)