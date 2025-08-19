import mongoose from 'mongoose';


const testResultSchema = new mongoose.Schema({
request: { type: mongoose.Schema.Types.ObjectId, ref: 'TestRequest', required: true },
uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
values: Object,
notes: String
}, { timestamps: true });


export default mongoose.model('TestResult', testResultSchema);