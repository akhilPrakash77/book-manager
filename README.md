# book-manager
This is a small book management application
# Features
Create a new book
Edit an existing book
Delete a book
Search for books by title, author, or description
Paginate through the list of books

# Technologies Used
Frontend:

React.js
Ant Design
Axios
Backend:

Node.js
Express
MongoDB
Mongoose

# Setup and Installation
Clone the repository: https://github.com/akhilPrakash77/book-manager.git
Navigate to the backend directory:cd backend
Install the dependencies: npm install
Create a .env file in the backend directory and add your MongoDB connection string:MONGO_URI=mongodb://localhost:27017/books-db
# Start the backend server: npm run dev

# Frontend Setup
Navigate to the frontend directory:cd frontend
Install the dependencies: npm install
# Start the frontend development server: npm start


#API Endpoints
Books
GET /books: Get all books with pagination and search functionality.
GET /books/:id: Get a single book by ID.
POST /books: Create a new book.
PUT /books/:id: Update an existing book by ID.
DELETE /books/:id: Delete a book by ID.


# Usage
Creating a Book
Click on the "Add New Book" button.
Fill out the form with the book's title, author, description, publish date, and price.
Click "Submit" to create the book.
Editing a Book
Click on the "Edit" button next to the book you want to edit.
Update the form fields as needed.
Click "Submit" to save the changes.
Deleting a Book
Click on the "Delete" button next to the book you want to delete.
Confirm the deletion in the modal dialog.
Searching for Books
Enter a search query in the search bar.
The list of books will be filtered based on the query.
Pagination
Use the pagination controls at the bottom of the list to navigate through the pages of books.

