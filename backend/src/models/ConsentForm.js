import mongoose from 'mongoose';
import { CONSENT_STATUS } from '../utils/constants.js';


const consentSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
trial: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial', required: true },
status: { type: String, enum: CONSENT_STATUS, default: 'pending' },
signedAt: Date,
data: Object
}, { timestamps: true });


export default mongoose.model('ConsentForm', consentSchema);