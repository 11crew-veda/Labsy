import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { getDashboardDoctor, approveConsent, rejectConsent, requestTest, searchPatient } from '../controllers/doctor.controller.js';


const r = Router();


r.use(auth, permit(ROLES.DOCTOR));


r.get('/dashboard', getDashboardDoctor);


r.post('/tests', requestTest);


r.patch('/consents/:id/approve', approveConsent);


r.patch('/consents/:id/reject', rejectConsent);


r.get('/patients/search', searchPatient);


export default r;