import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import gameRoutes from './routes/gameRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.json());
app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to FurVentura API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
