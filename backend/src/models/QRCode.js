import mongoose from 'mongoose';


const qrSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
code: { type: String, required: true, unique: true },
meta: Object
}, { timestamps: true });


export default mongoose.model('QRCode', qrSchema);