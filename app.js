import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv';

import gameRoutes from './routes/gameRoutes.js';
import animalRoutes from './routes/animalRoutes.js'
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js'
import packageJson from './package.json' assert { type: 'json' };

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
}
app.use(morgan('dev'))
app.options("", cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser());

app.use('/api/game', gameRoutes);
app.use('/api/animals', animalRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenido a FurVentura API');
});

app.get('/api/', (req, res) => {
    res.send('game - animals - events');
});

app.get('/api/version', (req, res) => {
    res.json({ "version": packageJson.version })
})

app.listen(port, () => {
    mongoose.connect(process.env['mongosrv']);
    console.log(`Server is running on port ${port}`);
});

export default app;