import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoute, { apiProtected } from './routes/api.js';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import { DB_CONNECT, PORT } from './utils/constant.js';

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

//  MongoDB connection
mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('API is running');
});


app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware, apiProtected);

//
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
