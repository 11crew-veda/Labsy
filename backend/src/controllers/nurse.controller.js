import catchAsync from '../utils/catchAsync.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';


export const getTasks = catchAsync(async (_req, res) => {
const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const tasks = await Appointment.find({ startAt: { $gte: start, $lt: end } }).populate('patient trial');
res.json({ tasks });
});


export const updatePatientStatus = catchAsync(async (req, res) => {
const { id } = req.params; // patient id
const { isActive } = req.body;
const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
res.json(user);
});


export const scheduleFollowup = catchAsync(async (req, res) => {
const created = await Appointment.create(req.body);
res.status(201).json(created);
});