import mongoose from 'mongoose';


const appointmentSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
trial: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial' },
title: String,
startAt: { type: Date, required: true },
notes: String
}, { timestamps: true });


export default mongoose.model('Appointment', appointmentSchema);