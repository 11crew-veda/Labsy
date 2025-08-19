import httpStatus from 'http-status';
import ApiError from './error.class.js';


export const notFound = (req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, 'Route not found'));


export const errorConverter = (err, _req, _res, next) => {
if (!(err instanceof ApiError)) {
const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
next(new ApiError(status, err.message || 'Internal error'));
} else next(err);
};


export const errorHandler = (err, _req, res, _next) => {
const payload = { message: err.message, status: err.statusCode || 500 };
if (process.env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack;
res.status(payload.status).json(payload);
};