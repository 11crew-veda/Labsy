import httpStatus from 'http-status';
import { verifyAccess } from '../utils/jwt.js';
import ApiError from './error.class.js';


export const auth = (req, _res, next) => {
try {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.accessToken;
if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Missing token');
req.user = verifyAccess(token);
next();
} catch (e) {
next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired token'));
}
};


export const permit = (...roles) => (req, _res, next) => {
if (!roles.includes(req.user.role)) return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
next();
};