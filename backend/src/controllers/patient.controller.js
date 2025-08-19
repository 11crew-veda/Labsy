import catchAsync from '../utils/catchAsync.js';
import ConsentForm from '../models/ConsentForm.js';
import Appointment from '../models/Appointment.js';
import TestRequest from '../models/TestRequest.js';
import TestResult from '../models/TestResult.js';


export const getDashboard = catchAsync(async (req, res) => {
const patientId = req.user.sub;
const consents = await ConsentForm.find({ patient: patientId }).populate('trial');
const appts = await Appointment.find({ patient: patientId }).sort({ startAt: 1 }).limit(5);
const tests = await TestRequest.find({ patient: patientId }).sort('-createdAt').limit(5);
res.json({ consents, appointments: appts, tests });
});


export const signConsent = catchAsync(async (req, res) => {
const { consentId } = req.params;
const consent = await ConsentForm.findOneAndUpdate(
{ _id: consentId, patient: req.user.sub },
{ status: 'signed', signedAt: new Date(), data: req.body?.data || {} },
{ new: true }
);
res.json(consent);
});


export const getResults = catchAsync(async (req, res) => {
const requests = await TestRequest.find({ patient: req.user.sub });
const results = await TestResult.find({ request: { $in: requests.map(r => r._id) } }).populate('request');
res.json(results);
});