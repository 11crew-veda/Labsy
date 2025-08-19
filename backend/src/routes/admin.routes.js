import { Router } from 'express';
import { auth, permit } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';
import { getMetrics, crudTrial, crudUser, createQRCode, listQRCodes } from '../controllers/admin.controller.js';


const r = Router();


r.use(auth, permit(ROLES.ADMIN));


r.get('/metrics', getMetrics);


// users
r.post('/users', crudUser.create);
r.get('/users', crudUser.list);
r.get('/users/:id', crudUser.get);
r.patch('/users/:id', crudUser.update);
r.delete('/users/:id', crudUser.remove);


// trials
r.post('/trials', crudTrial.create);
r.get('/trials', crudTrial.list);
r.patch('/trials/:id', crudTrial.update);
r.delete('/trials/:id', crudTrial.remove);


// QR Codes
r.post('/qrcodes', createQRCode);
r.get('/qrcodes', listQRCodes);


export default r;