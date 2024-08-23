import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import gameRoutes from './routes/gameRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
}
app.use(morgan('dev'))
app.options("", cors(corsConfig))
app.use(cors(corsConfig))
app.use(bodyparser.json());
app.use(cookieparser());
app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to FurVentura API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;