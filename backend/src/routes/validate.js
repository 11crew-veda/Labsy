import { validationResult } from 'express-validator';


export const validate = (req, _res, next) => {
const result = validationResult(req);
if (!result.isEmpty()) return next(new Error(result.array().map(e => `${e.path}: ${e.msg}`).join(', ')));
next();
};