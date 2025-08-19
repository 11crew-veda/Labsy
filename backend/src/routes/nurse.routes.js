import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { getTasks, updatePatientStatus, scheduleFollowup } from '../controllers/nurse.controller.js';


const r = Router();


r.use(auth, permit(ROLES.NURSE));


r.get('/tasks', getTasks);


r.patch('/patients/:id/status', updatePatientStatus);


r.post('/followups', scheduleFollowup);


export default r;