import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { getDashboard, signConsent, getResults } from '../controllers/patient.controller.js';


const r = Router();


r.use(auth, permit(ROLES.PATIENT));


r.get('/dashboard', getDashboard);


r.patch('/consents/:consentId/sign', signConsent);


r.get('/results', getResults);


export default r;