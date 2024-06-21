"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Book } from '../models/bookModel.js';
const booksController_1 = require("../controllers/booksController");
const router = express_1.default.Router();
// Route for Save a new Book
router.post('/', booksController_1.createAbook);
// Route for Get All Books from database
router.get('/', booksController_1.getAllBooks);
// Route for Get One Book from database by id
router.get('/:id', booksController_1.getAbook);
// Route for Update a Book
router.put('/:id', booksController_1.updateAbook);
// Route for Delete a book
router.delete('/:id', booksController_1.deleteAbook);
exports.default = router;
