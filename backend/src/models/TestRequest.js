import mongoose from 'mongoose';
import { TEST_STATUS } from '../utils/constants.js';


const testRequestSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
type: { type: String, required: true },
deadline: Date,
status: { type: String, enum: TEST_STATUS, default: 'scheduled' }
}, { timestamps: true });


export default mongoose.model('TestRequest', testRequestSchema);