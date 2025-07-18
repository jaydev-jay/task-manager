import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import Login from '../controllers/Login.controller.js';
import{createTodo} from '../controllers/todo.controller.js'
import { check } from 'express-validator';
import { GetTodos } from '../controllers/Todolist.controller.js';
import { MarkTodo } from '../controllers/Marktodo.controller.js';
import { RemoveTodo } from '../controllers/Removetodo.controller.js';
const apiRoute=express.Router();
export const apiProtected=express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

apiProtected.post('/createtodo',
    [check('desc','todo description is required').exists()],
    createTodo)

apiProtected.post('/marktodo',
    [check('todo_id','todo id require').exists()],
    MarkTodo)

apiProtected.post('/removetodo',
    [check('todo_id','todo id require').exists()],
    RemoveTodo)

apiProtected.get('/todolist',
    GetTodos)

export default apiRoute;