import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode,JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const Register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(statusCode.VALIDATION_ERROR, "validation error", errors.mapped())
    );
  }

  const { name, username, password, email } = req.body;
  console.log("Register Request Body:", req.body);

  try {
    // Check if user or email already exists
    const userExist = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExist) {
      return res.json(
        jsonGenerate(statusCode.UNPROCESSABLE_ENTRY, "User or email already exists")
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const result = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    console.log("JWT_SECRET:", JWT_TOKEN_SECRET);
        const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET)
    return res.json(
      jsonGenerate(statusCode.SUCCESS, "Registration successful", {userId:result._id,token:token})
    );
  } catch (error) {
  console.error(" Register error:", error);
  return res.json(
    jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Something went wrong", null)
  );
}

};

export default Register;
