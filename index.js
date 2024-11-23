import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv';
import { createRequire } from 'module';

// Rutas
import userRoutes from './routes/userRoutes.js';
import animalRoutes from './routes/animalRoutes.js'
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import achievementRoutes from './routes/achievementRoute.js'
import itemRoutes from './routes/itemRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"]
}
app.use(morgan('dev'))
app.options("", cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser());

app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/inventories', inventoryRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenido a FurVentura API');
});

app.get('/api/', (req, res) => {
    res.send('users - animals - events - auth');
});

app.get('/api/version', (req, res) => {
    res.json({ "version": packageJson.version })
})

app.listen(port, () => {
    mongoose.connect(process.env['mongosrv']).catch(e => {
        console.log("[MongoDB] El servidor no respondio, ejecutando servidor local: " + e)
        mongoose.connect(process.env['localsrv'])
    });
    console.log(`Server is running on port ${port}`);
});

export default app;