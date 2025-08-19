import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validate } from './validate.js';
import { ROLES } from '../utils/constants.js';


const r = Router();


r.post('/register', [
body('name').notEmpty(),
body('email').isEmail(),
body('password').isLength({ min: 6 }),
body('role').isIn(Object.values(ROLES))
], validate, register);


r.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);


r.post('/refresh', refresh);


r.post('/logout', logout);


export default r;