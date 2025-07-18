import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 32,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 32,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128, // bcrypt hashes are ~60 chars
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 64,
  },
  todos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Todo'
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('User', userSchema);
