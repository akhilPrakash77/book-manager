"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAbook = exports.updateAbook = exports.getAbook = exports.getAllBooks = exports.createAbook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
// Controller for saving a new book
const createAbook = async (request, response) => {
    try {
        const { title, author, desc, publishDate, price } = request.body;
        if (!title || !author || !desc || !publishDate || !price) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newBook = { title, author, desc, publishDate, price };
        const book = await bookModel_1.default.create(newBook);
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
exports.createAbook = createAbook;
// Controller for getting all books
const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const query = req.query.query || '';
        const skip = (page - 1) * pageSize;
        const searchQuery = query
            ? {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } },
                    { desc: { $regex: query, $options: 'i' } },
                ],
            }
            : {};
        const totalBooks = await bookModel_1.default.countDocuments(searchQuery);
        const books = await bookModel_1.default.find(searchQuery)
            .skip(skip)
            .limit(pageSize);
        res.status(200).json({
            total: totalBooks,
            data: books,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
exports.getAllBooks = getAllBooks;
// Controller for getting one book by id
const getAbook = async (request, response) => {
    try {
        const { id } = request.params;
        const book = await bookModel_1.default.findById(id);
        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
exports.getAbook = getAbook;
// Controller for updating a book
const updateAbook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, desc, publishDate, price } = req.body;
        if (!title || !author || !desc || !publishDate || !price) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, desc, publishDate, price',
            });
        }
        const updatedBook = await bookModel_1.default.findByIdAndUpdate(id, { title, author, desc, publishDate, price }, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).send({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};
exports.updateAbook = updateAbook;
// Controller for deleting a book
const deleteAbook = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await bookModel_1.default.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
exports.deleteAbook = deleteAbook;
