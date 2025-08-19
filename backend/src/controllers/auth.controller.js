import httpStatus from 'http-status';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import { signAccess, signRefresh, verifyRefresh } from '../utils/jwt.js';
import ApiError from '../middleware/error.class.js';
import { ROLES } from '../utils/constants.js';


export const register = catchAsync(async (req, res) => {
const { name, email, password, role } = req.body;
if (!Object.values(ROLES).includes(role)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role');
const exists = await User.findOne({ email });
if (exists) throw new ApiError(httpStatus.CONFLICT, 'Email already registered');
const user = await User.create({ name, email, password, role });
res.status(httpStatus.CREATED).json({ id: user._id, name: user.name, email: user.email, role: user.role });
});


export const login = catchAsync(async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email }).select('+password');
if (!user || !(await user.compare(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');


const payload = { sub: user.id, role: user.role, name: user.name };
const accessToken = signAccess(payload);
const refreshToken = signRefresh(payload);


res
.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: false })
.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', secure: false })
.json({ accessToken, refreshToken, user: { id: user.id, name: user.name, role: user.role } });
});


export const refresh = catchAsync(async (req, res) => {
const token = req.cookies?.refreshToken || req.body.refreshToken;
if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Missing refresh token');
const payload = verifyRefresh(token);
const accessToken = signAccess({ sub: payload.sub, role: payload.role, name: payload.name });
res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', secure: false }).json({ accessToken });
});


export const logout = catchAsync(async (_req, res) => {
res.clearCookie('accessToken').clearCookie('refreshToken').json({ ok: true });
});