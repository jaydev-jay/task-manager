import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, statusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Login =async (req,res) => {

    const errors = validationResult(req)
    if(errors.isEmpty()){
        const {username,password}=req.body
        const user = await User.findOne({username:username})
        if(!user){
           return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTRY,'username and password is incorrect'))
        }

        const verified = bcrypt.compareSync(password,user.password)
        if(!verified){
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTRY,'username or password is incorrect'))
        }
        const token = jwt.sign({userId:user._id},JWT_TOKEN_SECRET)
        return res.json(jsonGenerate(statusCode.SUCCESS, 'login successful',{userId:user._id, token:token}))
    }
  res.json(jsonGenerate(statusCode.VALIDATION_ERROR,'validation error ',errors.mapped()))
}
export default Login;