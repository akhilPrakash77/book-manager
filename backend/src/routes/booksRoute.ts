import express from 'express';
// import { Book } from '../models/bookModel.js';
import { createAbook, deleteAbook, getAbook, getAllBooks, updateAbook } from '../controllers/booksController';

const router = express.Router();

// Route for Save a new Book
router.post('/', createAbook);

// Route for Get All Books from database
router.get('/',getAllBooks);

// Route for Get One Book from database by id
router.get('/:id',getAbook);

// Route for Update a Book
router.put('/:id', updateAbook);

// Route for Delete a book
router.delete('/:id', deleteAbook);



export default router;