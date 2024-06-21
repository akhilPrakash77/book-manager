import { Request, Response } from 'express';
import Book from '../models/bookModel';

// Controller for saving a new book
export const createAbook = async (request: Request, response: Response) => {
  try {
    const { title, author, desc, publishDate, price } = request.body;

    if (!title || !author ||!desc || !publishDate || !price) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const newBook = { title, author,desc, publishDate,price };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error :any) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller for getting all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;
    const query: string = req.query.query as string || '';
    const skip: number = (page - 1) * pageSize;

    const searchQuery = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
            { desc: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const totalBooks: number = await Book.countDocuments(searchQuery);
    const books = await Book.find(searchQuery)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      total: totalBooks,
      data: books,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
// Controller for getting one book by id
export const getAbook = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json(book);
  } catch (error :any) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller for updating a book
export const updateAbook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, desc, publishDate, price } = req.body;

    if (!title || !author || !desc || !publishDate || !price) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, desc, publishDate, price',
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, desc, publishDate, price },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
// Controller for deleting a book
export const deleteAbook = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error :any) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


  
  
