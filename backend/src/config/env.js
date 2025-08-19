import 'dotenv/config';


const env = {
NODE_ENV: process.env.NODE_ENV || 'development',
PORT: process.env.PORT || 4000,
MONGODB_URI: process.env.MONGODB_URI,
ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '15m',
REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '7d',
JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};


export default env;