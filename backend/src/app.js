import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import router from './routes/index.js';
import { errorConverter, errorHandler, notFound } from './middleware/error.js';


const app = express();


app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL.split(','), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/health', (req, res) => res.json({ ok: true }));


app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));


app.use('/api', router);


app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);


export default app;