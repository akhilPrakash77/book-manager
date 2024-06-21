import { Schema, Document, model } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  desc: string;
  publishDate: Date; 
  price: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;


