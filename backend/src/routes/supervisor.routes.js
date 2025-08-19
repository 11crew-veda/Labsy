import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { listPendingReports, approveReport, verifyHash } from '../controllers/supervisor.controller.js';


const r = Router();


r.use(auth, permit(ROLES.SUPERVISOR));


r.get('/reports/pending', listPendingReports);


r.patch('/reports/:id/approve', approveReport);


r.post('/verification/hash', verifyHash);


export default r;