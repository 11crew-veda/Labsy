import catchAsync from '../utils/catchAsync.js';
import ConsentForm from '../models/ConsentForm.js';
import TestRequest from '../models/TestRequest.js';
import User from '../models/User.js';


export const getDashboardDoctor = catchAsync(async (req, res) => {
const approvals = await ConsentForm.find({ status: 'pending' }).populate('patient trial');
const statuses = await TestRequest.find({}).sort('-createdAt').limit(10).populate('patient');
res.json({ approvals, testStatuses: statuses });
});


export const approveConsent = catchAsync(async (req, res) => {
const { id } = req.params;
const updated = await ConsentForm.findByIdAndUpdate(id, { status: 'signed', signedAt: new Date() }, { new: true });
res.json(updated);
});


export const rejectConsent = catchAsync(async (req, res) => {
const { id } = req.params;
const updated = await ConsentForm.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
res.json(updated);
});


export const requestTest = catchAsync(async (req, res) => {
const { patientId, type, deadline } = req.body;
const exists = await User.findById(patientId);
if (!exists) return res.status(404).json({ message: 'Patient not found' });
const created = await TestRequest.create({ patient: patientId, requestedBy: req.user.sub, type, deadline });
res.status(201).json(created);
});


export const searchPatient = catchAsync(async (req, res) => {
const q = req.query.q || '';
const list = await User.find({ role: 'patient', name: { $regex: q, $options: 'i' } }).select('name email');
res.json(list);
});