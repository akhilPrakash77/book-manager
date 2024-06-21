import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  console.log(req);
  return res.status(234).send('hi from server');
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
