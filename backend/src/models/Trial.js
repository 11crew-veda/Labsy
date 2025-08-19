import mongoose from 'mongoose';


const trialSchema = new mongoose.Schema({
code: { type: String, required: true, unique: true },
title: String,
phase: String,
isActive: { type: Boolean, default: true }
}, { timestamps: true });


export default mongoose.model('Trial', trialSchema);