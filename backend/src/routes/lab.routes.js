import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { listRequests, uploadResult, viewResult } from '../controllers/lab.controller.js';


const r = Router();


r.use(auth, permit(ROLES.LAB));


r.get('/requests', listRequests);


r.post('/results', uploadResult);


r.get('/results/:id', viewResult);


export default r;