import catchAsync from '../utils/catchAsync.js';
import TestRequest from '../models/TestRequest.js';
import TestResult from '../models/TestResult.js';


export const listRequests = catchAsync(async (_req, res) => {
const list = await TestRequest.find().populate('patient requestedBy');
res.json(list);
});


export const uploadResult = catchAsync(async (req, res) => {
const { requestId, values, notes } = req.body;
const result = await TestResult.create({ request: requestId, uploadedBy: req.user.sub, values, notes });
await TestRequest.findByIdAndUpdate(requestId, { status: 'completed' });
res.status(201).json(result);
});


export const viewResult = catchAsync(async (req, res) => {
const { id } = req.params;
const result = await TestResult.findById(id).populate({ path: 'request', populate: ['patient', 'requestedBy'] });
res.json(result);
});