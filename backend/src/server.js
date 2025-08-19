import { createServer } from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import env from './config/env.js';


const server = createServer(app);


connectDB().then(() => {
server.listen(env.PORT, () => {
console.log(`⚗️ Labsy backend listening on :${env.PORT}`);
});
});