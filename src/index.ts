import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database/connect';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Server started at http://localhost:3000'))