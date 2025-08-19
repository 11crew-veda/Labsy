import mongoose from 'mongoose';
import { REPORT_STATUS } from '../utils/constants.js';


const reportSchema = new mongoose.Schema({
trial: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial', required: true },
title: String,
status: { type: String, enum: REPORT_STATUS, default: 'submitted' },
dataHash: String
}, { timestamps: true });


export default mongoose.model('Report', reportSchema);