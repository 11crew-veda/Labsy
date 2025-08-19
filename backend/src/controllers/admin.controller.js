import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.js';
import Trial from '../models/Trial.js';
import TestRequest from '../models/TestRequest.js';


export const getMetrics = catchAsync(async (_req, res) => {
const [activeTrials, totalPatients, staffCount, pendingActions] = await Promise.all([
Trial.countDocuments({ isActive: true }),
User.countDocuments({ role: 'patient' }),
User.countDocuments({ role: { $in: ['doctor', 'nurse', 'lab_scientist', 'supervisor', 'hospital_admin'] } }),
TestRequest.countDocuments({ status: { $ne: 'completed' } })
]);
res.json({ activeTrials, totalPatients, staffCount, pendingActions });
});


export const crudUser = {
create: catchAsync(async (req, res) => { const u = await User.create(req.body); res.status(201).json(u); }),
list: catchAsync(async (_req, res) => { const u = await User.find(); res.json(u); }),
get: catchAsync(async (req, res) => { const u = await User.findById(req.params.id); res.json(u); }),
update: catchAsync(async (req, res) => { const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(u); }),
remove: catchAsync(async (req, res) => { await User.findByIdAndDelete(req.params.id); res.status(204).end(); })
};


export const crudTrial = {
create: catchAsync(async (req, res) => { const t = await Trial.create(req.body); res.status(201).json(t); }),
list: catchAsync(async (_req, res) => { const t = await Trial.find(); res.json(t); }),
update: catchAsync(async (req, res) => { const t = await Trial.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(t); }),
remove: catchAsync(async (req, res) => { await Trial.findByIdAndDelete(req.params.id); res.status(204).end(); })
};


// QR Codes can be generated/stored; for brevity we accept provided code
import QRCode from '../models/QRCode.js';
export const createQRCode = catchAsync(async (req, res) => { const q = await QRCode.create(req.body); res.status(201).json(q); });
export const listQRCodes = catchAsync(async (_req, res) => { const q = await QRCode.find().populate('patient'); res.json(q); });