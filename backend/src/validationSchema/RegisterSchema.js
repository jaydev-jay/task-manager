import {check} from 'express-validator'

export const RegisterSchema =[
    check('name').trim().isAlpha().withMessage('name should be alphabet only'),
    check('username','username is required').exists().isAlphanumeric().withMessage('username should be alphanumeric character ').trim().isLength({min:6,max:20}),
    check('password', 'password is required').exists().isLength({min:6,max:30}).trim(),
    check('email','email is required').exists().isEmail(),
]