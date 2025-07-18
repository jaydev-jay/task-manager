import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js"
import { statusCode } from "../utils/constant.js"
import Todo from "../models/Todo.js"
import User from "../models/User.js"


export const createTodo =async (req,res)=>{
  const error = validationResult(req)
  if (!error.isEmpty()){
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,'todo is required ',error.mapped()))
  }
  try {
    const result = await Todo.create({
        userId:req.userId,
        desc:req.body.desc
    })
    if (result){
        const user = await User.findOneAndUpdate({_id:req.userId},
            {$push: { todos: result }},
            { new: true, useFindAndModify: false }
        )
        return res.json(jsonGenerate(statusCode.SUCCESS,'todo created successfully',result))
    }
  } catch (error) {
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTRY,'something went wront',error))

  }
}