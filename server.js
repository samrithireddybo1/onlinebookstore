// routes/books.js

const express = require('express');
const mongoose = require("mongoose");
const Book = require('./models/bookstore');

const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new book
router.post('/addbook', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        // Add other properties as needed
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      const { title, author, genre, price, availability } = req.body;
  
      const updatedBook = await Book.findByIdAndUpdate(bookId, {
        title,
        author,
        genre,
        price,
        availability
      }, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Delete a book
  router.delete('/api/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
  
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
module.exports = router;
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to local MongoDB');
    router.listen(3002, () => {
      console.log(`Node API app is running on port 3002`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to local MongoDB:', error);
  });