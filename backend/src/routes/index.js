import { Router } from 'express';
import authRoutes from './auth.routes.js';
import patientRoutes from './patient.routes.js';
import doctorRoutes from './doctor.routes.js';
import nurseRoutes from './nurse.routes.js';
import adminRoutes from './admin.routes.js';
import labRoutes from './lab.routes.js';
import supervisorRoutes from './supervisor.routes.js';


const router = Router();


router.use('/auth', authRoutes);
router.use('/patient', patientRoutes);
router.use('/doctor', doctorRoutes);
router.use('/nurse', nurseRoutes);
router.use('/admin', adminRoutes);
router.use('/lab', labRoutes);
router.use('/supervisor', supervisorRoutes);


export default router;